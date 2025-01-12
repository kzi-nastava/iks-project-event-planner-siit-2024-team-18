import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Message, Chat } from '../models/chat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.apiHost}/api/chat`;
  private websocketUrl = `${environment.apiHost}/chat`;
  private stompClient: any;
  private messageSubject = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {}

  get messages$(): Observable<Message[]> {
    return this.messageSubject.asObservable();
  }

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/chats`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${chatId}`);
  }

  sendMessage(chatId: number, content: string, senderUsername: string): void {
    if (this.stompClient && this.stompClient.connected) {
      const messagePayload = { chatId, content, senderUsername };
      this.stompClient.send('/app/send', {}, JSON.stringify(messagePayload));
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  initializeWebSocketConnection(chatId: number): void {
    if (this.stompClient) {
      console.log('WebSocket is already connected.');
      return;
    }

    const ws = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect(
      {},
      () => {
        this.subscribeToMessages(chatId);
        console.log(`WebSocket connected for chatId: ${chatId}`);
      },
      (error: any) => {
        console.error('WebSocket connection error:', error);
      }
    );
  }

  private subscribeToMessages(chatId: number): void {
    this.stompClient.subscribe(`/topic/messages/${chatId}`, (message: { body: string }) => {
      const newMessage: Message = JSON.parse(message.body);
      const currentMessages = this.messageSubject.getValue();
      this.messageSubject.next([...currentMessages, newMessage]);
    });
  }

  disconnectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket connection closed');
        this.stompClient = null;
      });
    }
  }
}
