import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationCard } from '../../models/notification-card.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  @Input() notification!: NotificationCard;
  @Output() notificationClick = new EventEmitter<number>();

  onNotificationClick(): void {
    this.notificationClick.emit(this.notification.id);
  }
}