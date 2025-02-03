import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { NotificationCard } from '../models/notification-card.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationManagerService {
  private notificationsSubject = new BehaviorSubject<NotificationCard[]>([]);
  private stompClient!: Client;
  private serverUrl = `${environment.apiHost}/notifications`;

  constructor(private notificationService: NotificationService) {}

  get notifications$(): Observable<NotificationCard[]> {
    return this.notificationsSubject.asObservable();
  }

  get unseenNotificationsCount$(): Observable<number> {
    return this.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.seen).length)
    );
  }

  updateNotifications(updatedNotifications: NotificationCard[]): void {
    this.notificationsSubject.next(updatedNotifications);
  }

  fetchNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data: NotificationCard[]) => {
        this.notificationsSubject.next(data);
      },
      error: (error) => {
        console.error('Failed to fetch notifications', error);
      }
    });
  }

  initializeWebSocketConnection(userId: number): void {
    if (this.stompClient && this.stompClient.active) return;

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      onConnect: () => this.subscribeToNotifications(userId),
      onStompError: (error) => console.error('WebSocket error:', error),
    });

    this.stompClient.activate();
  }

  private subscribeToNotifications(userId: number): void {
    if (userId) {
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification: NotificationCard = JSON.parse(message.body);
        const currentNotifications = this.notificationsSubject.getValue();
        this.notificationsSubject.next([notification, ...currentNotifications]);
      });
    }
  }

  disconnectWebSocket(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
