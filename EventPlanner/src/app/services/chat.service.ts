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
  private websocketUrl = `${environment.apiHost}/chat`;  // WebSocket URL
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

  sendMessage(chatId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/app/send`, { chatId, content });
  }

  initializeWebSocketConnection(): void {
    if (this.stompClient) return;
    const ws = new SockJS(this.websocketUrl);
    this.stompClient = Stomp.over(ws);
    
    this.stompClient.connect({}, () => {
      this.subscribeToMessages();
    }, (error: any) => {
      console.error('WebSocket connection error:', error);
    });
  }
  
  private subscribeToMessages(): void {
    this.stompClient.subscribe('/topic/messages', (message: { body: string }) => {
      const newMessage: Message = JSON.parse(message.body);
      const currentMessages = this.messageSubject.getValue();
      this.messageSubject.next([newMessage, ...currentMessages]);
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
