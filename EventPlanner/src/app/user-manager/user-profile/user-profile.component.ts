import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
    activeMenu: string = 'calendar';
    user: User = {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        companyName: '',
        image: '',
        address: '',
        phone: '',
        description: '',
        categories: [],
        eventTypes: [],
        password: '',
    };

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.userService.getLoggedUser().subscribe((user) => {
            this.user = user!;
        });
    }

    private logout(): void {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['']);
    }

    deactivate(event: MouseEvent): void {
  event.stopPropagation();

  const dialogRef = this.dialog.open(DeleteFormComponent, {
    width: '27em',
    data: { message: 'Are you sure you want to deactivate your profile?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.userService.deactivate().subscribe(
        () => {
          this.snackBar.open('Successfully deactivated account', 'OK', {
            duration: 3000,
          });
          this.logout();
        },
        error => {
          console.log(error)
          this.snackBar.open('Error deactivating account', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  });
}
}
