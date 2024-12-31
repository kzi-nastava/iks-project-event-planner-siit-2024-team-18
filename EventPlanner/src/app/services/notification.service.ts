import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { NotificationCard } from '../models/notification-card.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  getAllNotifications(): Observable<NotificationCard[]> {
    return this.httpClient.get<NotificationCard[]>(`${environment.apiHost}/notifications-all`);
  }

  toggleNotifications(): Observable<string> {
    return this.httpClient.get<string>(`${environment.apiHost}/toggle-notifications`);
  }
  
  getNotificationById(notificationId: number): Observable<NotificationCard> {
      return this.httpClient.get<NotificationCard>(environment.apiHost + "/" + notificationId);
  }
}