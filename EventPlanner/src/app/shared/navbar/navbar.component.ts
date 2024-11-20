import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  get userProfilePhoto(): string | null {
    const user = this.authService.getUser();
    return user?.profilePhoto || null;
  }

  get userFullName(): string | null {
    const user = this.authService.getUser();
    return user ? `${user.firstName} ${user.lastName}` : null;
  }

  get userEmail(): string | null {
    const user = this.authService.getUser();
    return user?.email || null;
  }

  get userRole(): string | null {
    return this.authService.getRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
