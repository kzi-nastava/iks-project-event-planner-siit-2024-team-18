import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationFormComponent } from '../confirmation-form/confirmation-form.component';
import { SubmitReportComponent } from '../submit-report/submit-report.component';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrl: './other-user-profile.component.css'
})
export class OtherUserProfileComponent implements OnInit {
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
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getOtherUser(userId).subscribe((user) => {
      this.user = user!;
    });
  }

  blockUser(): void {
    const dialogRef = this.dialog.open(ConfirmationFormComponent, {
      width: '27em',
      data: { message: `Are you sure you want to block ${this.user.firstName} ${this.user.lastName}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.userService.blockUser(this.user.id).subscribe(() => {
        //   this.snackBar.open('User successfully blocked', 'OK', {
        //     duration: 3000,
        //   });
        // });
      }
    });
  }

  reportUser(): void {
    const dialogRef = this.dialog.open(ConfirmationFormComponent, {
      width: '27em',
      data: { message: `Are you sure you want to report ${this.user.firstName} ${this.user.lastName}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const dialogRef = this.dialog.open(SubmitReportComponent, {
          width: '30em',
          data: { userId: this.user.id, userName: `${this.user.firstName} ${this.user.lastName}` },
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.snackBar.open('Report dialog closed.', 'OK', { duration: 3000 });
          }
        });
      }
    });
  }
}
