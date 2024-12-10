import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['']);
  }
}
