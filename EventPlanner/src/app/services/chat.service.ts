import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Message, Chat } from '../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.apiHost}/api/chat`;
  private websocketUrl = `${environment.apiHost}/chat`;
  private stompClient: any;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private messagesPerChatSubject = new BehaviorSubject<Message[]>([]);
  private activeChatSubscriptions: Set<number> = new Set();
  private unseenMessagesPerChatSubject = new BehaviorSubject<Map<number, number>>(new Map());
  
  loggedUser: User | null = null;

  constructor(
    private http: HttpClient
  ) {}

  get messages$(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  get messagesPerChat$(): Observable<Message[]> {
    return this.messagesPerChatSubject.asObservable();
  }

  get unseenMessagesCount$(): Observable<number> {
    return this.messages$.pipe(
      map((messages) => messages.filter((m) => !m.seen && m.senderUsername != this.loggedUser?.firstName).length)
    );
  }

  get unseenMessagesPerChat$(): Observable<Map<number, number>> {
    return this.unseenMessagesPerChatSubject.asObservable();
  }

  public updateUnseenMessagesCount(): void {
    const messages = this.messagesSubject.getValue();
    const unseenCounts = new Map<number, number>();

    messages.forEach((message) => {
      if (!message.seen && message.senderUsername != this.loggedUser!.firstName) {
        unseenCounts.set(message.chatId, (unseenCounts.get(message.chatId) || 0) + 1);
      }
    });
    
    this.unseenMessagesPerChatSubject.next(unseenCounts);
  }

  fetchMessagesForChat(chatId: number): void {
    this.messagesSubject.next([]);
    this.getMessages(chatId).subscribe({
      next: (messages: Message[]) => {
        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([...currentMessages, ...messages]);
        this.updateUnseenMessagesCount();
      },
      error: (error) => {
        console.error(`Failed to fetch messages for chat ${chatId}`, error);
      },
    });
  }

  fetchMessages(userId: number): void {
    this.getChats(userId).subscribe({
      next: (data: Chat[]) => {
        data.forEach(chat => {
          this.getMessages(chat.id).subscribe({
            next: (data: Message[]) => {
              this.messagesSubject.next(data);
            },
            error: (error) => {
              console.error('Failed to fetch messages', error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Failed to fetch messages', error);
      }
    });
  }

  getChats(userId: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats/${userId}`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${chatId}`);
  }

  updateMessagesBackend(updatedMessages: Message[]): void {
    this.http.put<void>(`${this.apiUrl}/messages/update`, updatedMessages)
      .subscribe({
        next: () => {
          console.log('Messages updated successfully.');
        },
        error: (err) => {
          console.error('Failed to update messages:', err);
        }
      });
  }

  updateMessages(updatedMessages: Message[]): void {
    const currentMessages = this.messagesSubject.getValue();
    const updatedMessageList = currentMessages.map((msg) => {
        const updatedMessage = updatedMessages.find((updated) => updated.id === msg.id);
        return updatedMessage ? { ...msg, ...updatedMessage } : msg;
    });

    const isUnchanged = currentMessages.length === updatedMessageList.length &&
                        currentMessages.every((msg, index) =>
                            (Object.keys(msg) as Array<keyof Message>).every(key =>
                                msg[key] === updatedMessageList[index][key]
                            )
                        );

    if (!isUnchanged) {
      this.messagesSubject.next(updatedMessageList);
      this.messagesPerChatSubject.next(updatedMessages);
    }

    this.updateUnseenMessagesCount();
    this.updateMessagesBackend(updatedMessageList);
  }

  sendMessage(chatId: number, content: string, senderUsername: string): void {
    if (this.stompClient && this.stompClient.connected) {
      
      const messagePayload = { chatId, content, senderUsername };
      this.stompClient.send('/app/send', {}, JSON.stringify(messagePayload));
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  initializeWebSocketConnection(loggedUser: User): void {
    if (this.stompClient) {
      console.log('WebSocket is already connected.');
      return;
    }
  
    this.loggedUser = loggedUser;

    const ws = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(ws);
  
    this.stompClient.connect(
      { userId: loggedUser.id.toString() },
      () => {
        console.log('WebSocket connected for userId:', loggedUser.id);
        this.loadInitialChatSubscriptions(loggedUser.id);
      },
      (error: any) => {
        console.error('WebSocket connection error:', error);
      }
    );
  }

  private loadInitialChatSubscriptions(userId: number): void {
    this.getChats(userId).subscribe((chats) => {
      chats.forEach(chat => {
        if (!this.activeChatSubscriptions.has(chat.id)) {
          this.subscribeToChat(chat.id);
        }
      });
    });
  }

  private subscribeToChat(chatId: number): void {
    this.stompClient.subscribe(`/topic/messages/${chatId}`, (message: { body: string }) => {
      const newMessage: Message = JSON.parse(message.body);
      const currentMessages = this.messagesSubject.getValue();
  
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        if (newMessage.senderUsername === this.loggedUser!.firstName) {
          newMessage.seen = true;
        }
  
        this.messagesSubject.next([...currentMessages, newMessage]);
        this.messagesPerChatSubject.next([...this.messagesPerChatSubject.getValue(), newMessage]);
        this.updateUnseenMessagesCount();
      }
    });
  }
  
  disconnectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket connection closed');
        this.stompClient = null;
        this.activeChatSubscriptions.clear();
      });
    }
  }
}