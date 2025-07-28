import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NotificationManagerService } from '../../services/notification-manager.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  unseenNotificationsCount: number = 0;
  unseenMessagesCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private notificationManager: NotificationManagerService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getLoggedUser().subscribe(user => {
        this.notificationManager.fetchNotifications();
        this.notificationManager.initializeWebSocketConnection(user.id);
        this.chatService.initializeWebSocketConnection(user);
      });

      this.notificationManager.unseenNotificationsCount$.subscribe((count) => {
        this.unseenNotificationsCount = count;
      });

      this.chatService.unseenMessagesCount$.subscribe((count) => {
        this.unseenMessagesCount = count;
      });
    }
  }

  refreshNavbar(): void{
    this.ngOnInit();
  }

  get userProfilePhoto(): string | null {
    const user = this.authService.getUserInfo();
    return user?.profilePhoto || null;
  }

  get userFullName(): string | null {
    const user = this.authService.getUserInfo();
    return user ? `${user.firstName} ${user.lastName}` : null;
  }

  get userEmail(): string | null {
    const user = this.authService.getUserInfo();
    return user?.sub || null;
  }

  get userRole(): string | null {
    return this.authService.getRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.notificationManager.disconnectWebSocket();
    this.chatService.disconnectWebSocket();
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
