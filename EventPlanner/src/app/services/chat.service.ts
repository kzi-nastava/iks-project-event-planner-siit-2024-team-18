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
  private allMessagesSubject = new BehaviorSubject<Message[]>([]);
  private messagesPerChatSubject = new BehaviorSubject<Message[]>([]);
  private activeChatSubscriptions: Set<number> = new Set();
  private unseenMessagesPerChatSubject = new BehaviorSubject<Map<number, number>>(new Map());
  private lastMessagesSubject = new BehaviorSubject<{ [chatId: number]: Message }>({});
  private currentChatSubject = new BehaviorSubject<Chat | null>(null);

  get currentChat$(): Observable<Chat | null> {
    return this.currentChatSubject.asObservable();
  }
  
  setCurrentChat(chat: Chat | null): void {
    this.currentChatSubject.next(chat);
  }
  
  loggedUser: User | null = null;

  constructor(
    private http: HttpClient
  ) {}

  get allMessages$(): Observable<Message[]> {
    return this.allMessagesSubject.asObservable();
  }

  get messagesPerChat$(): Observable<Message[]> {
    return this.messagesPerChatSubject.asObservable();
  }

  get unseenMessagesCount$(): Observable<number> {
    return this.allMessages$.pipe(
      map((messages) => messages.filter((m) => !m.seen && m.senderUsername != this.loggedUser?.firstName).length)
    );
  }

  get unseenMessagesPerChat$(): Observable<Map<number, number>> {
    return this.unseenMessagesPerChatSubject.asObservable();
  }

  get lastMessages$(): Observable<{ [chatId: number]: Message }> {
    return this.lastMessagesSubject.asObservable();
  }
  
  initializeWebSocketConnection(user: User): void {
    if (this.stompClient) {
      console.log('WebSocket is already connected.');
      return;
    }
  
    this.loggedUser = user;

    const ws = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(ws);
  
    this.stompClient.connect(
      { userId: this.loggedUser.id.toString() },
      () => {
        console.log('WebSocket connected for userId:', this.loggedUser!.id);
        this.loadInitialChatSubscriptions(this.loggedUser!.id);
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

  // triggers when message is received
  private subscribeToChat(chatId: number): void {
    const subscription = this.stompClient.subscribe(`/topic/messages/${chatId}`, (message: { body: string }) => {
      const newMessage: Message = JSON.parse(message.body);
      const currentMessages = this.allMessagesSubject.getValue();
  
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        if (newMessage.senderUsername === this.loggedUser!.firstName) {
          newMessage.seen = true;
        }
  
        this.allMessagesSubject.next([...currentMessages, newMessage]);

        if (this.currentChatSubject.getValue()?.id == newMessage.chatId) {
          newMessage.seen = true;
          this.messagesPerChatSubject.next([...this.messagesPerChatSubject.getValue(), newMessage]);
          this.updateMessages([newMessage]);
        } else {
          this.updateUnseenMessagesCount();
        }
  
        this.updateLastMessageForChat(chatId, newMessage);
      }
    });
  }
  
  private updateLastMessageForChat(chatId: number, message: Message): void {
    const currentLastMessages = this.lastMessagesSubject.getValue();
    const updatedLastMessages = { ...currentLastMessages, [chatId]: message };
    this.lastMessagesSubject.next(updatedLastMessages);
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

  updateMessages(updatedMessages: Message[]): void {
    const currentMessages = this.allMessagesSubject.getValue();
    const updatedMessageList = currentMessages.map((msg) => {
      const updatedMessage = updatedMessages.find((updated) => updated.id === msg.id);
      return updatedMessage ? { ...msg, ...updatedMessage } : msg;
    });
    
    this.allMessagesSubject.next(updatedMessageList);
    this.messagesPerChatSubject.next(updatedMessages);
    this.updateUnseenMessagesCount();
  }

  private updateUnseenMessagesCount(): void {
    const messages = this.allMessagesSubject.getValue();
    const unseenCounts = new Map<number, number>();

    messages.forEach((message) => {
      if (!message.seen && message.senderUsername != this.loggedUser!.firstName) {
        unseenCounts.set(message.chatId, (unseenCounts.get(message.chatId) || 0) + 1);
      }
    });
    
    this.unseenMessagesPerChatSubject.next(unseenCounts);
  }

  sendMessage(chatId: number, content: string, senderUsername: string): void {
    if (this.stompClient && this.stompClient.connected) {
      const messagePayload = { chatId, content, senderUsername };
      this.stompClient.send('/app/send', {}, JSON.stringify(messagePayload));
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  getChats(userId: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats/${userId}`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${chatId}`);
  }

  getLastMessageForChat(chatId: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/messages/last/${chatId}`);
  }
}
