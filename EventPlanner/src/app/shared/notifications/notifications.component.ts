import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationCard } from '../../models/notification-card.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationManagerService } from '../../services/notification-manager.service';
import { EventService } from '../../services/event.service';
import { ServiceManagerService } from '../../services/service-manager.service';
import { ProductManagerService } from '../../services/product-manager.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationCard[] = [];
  notification!: NotificationCard;
  isMuted: boolean = false;
  user: User = {
      id: 0,
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      companyName: '',
      notificationStatus: '',
      image: '',
      address: '',
      phone: '',
      description: '',
      categories: [],
      eventTypes: [],
      password: '',
    }

  constructor(private notificationService: NotificationService,
              private userService: UserService,
              private notificationManager: NotificationManagerService,
              private eventService: EventService,
              private serviceManagerService: ServiceManagerService,
              private productManagerService: ProductManagerService) {}

  ngOnInit(): void {
    this.notificationManager.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
    this.userService.getLoggedUser().subscribe((user) => {
        this.user = user!;
        this.isMuted = (this.user.notificationStatus === 'ENABLED') ? false : true;
    });
  }

  toggleMute(): void {
    this.notificationService.toggleNotifications().subscribe({
      next: () => {
        console.log('Notifications muted/unmuted');
      },
      error: (error) => {
        console.error('Failed to toggle mute notifications', error);
      }
    });
  }

  handleNotificationClick(notificationId: number): void {
    this.notificationService.getNotificationById(notificationId).subscribe({
          next: (data: NotificationCard) => {
            this.notification = data;
            const { itemId, notificationType } = this.notification;
        
            if (notificationType === 'EVENT') {
              this.eventService.openEventDetails(itemId);
            } else if (notificationType === 'SERVICE') {
              this.serviceManagerService.openServiceDetails(itemId);
            } else if (notificationType === 'PRODUCT') {
              this.productManagerService.openProductDetails(itemId);
            }
        
            this.notification.seen = true;
        
            const updatedNotifications = this.notifications.map((n) =>
              n.id === this.notification.id ? { ...n, seen: true } : n
            );
            this.notificationManager.updateNotifications(updatedNotifications);
          },
          error: (err) => {
            console.error('Failed to fetch notification:', err);
          }
    });
  }

}
