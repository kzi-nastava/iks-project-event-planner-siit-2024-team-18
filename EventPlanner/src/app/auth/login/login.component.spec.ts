import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationManagerService } from '../../services/notification-manager.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbarComponent {
  refreshNavbar() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [LoginComponent, MockNavbarComponent],
      providers: [
        { provide: NavbarComponent, useClass: MockNavbarComponent },
        { provide: AuthService, useValue: {} },
        { provide: UserService, useValue: { getLoggedUser: () => of({}) } },
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: NotificationManagerService, useValue: {} },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
