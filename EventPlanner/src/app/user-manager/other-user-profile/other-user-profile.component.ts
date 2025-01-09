import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BlockService } from '../../services/block.service';
import { User } from '../../models/user.model';
import { Block } from '../../models/block.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationFormComponent } from '../confirmation-form/confirmation-form.component';
import { SubmitReportComponent } from '../submit-report/submit-report.component';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
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

  isBlocked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private blockService: BlockService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getOtherUser(userId).subscribe((user) => {
      this.user = user!;
    });

    this.blockService.getBlock(userId).subscribe((block) => {
      this.isBlocked = !!block;
    });
  }

  unblockUser(): void {
    const dialogRef = this.dialog.open(ConfirmationFormComponent, {
      width: '27em',
      data: { message: `Are you sure you want to unblock ${this.user.firstName} ${this.user.lastName}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const block: Block = {
          blockedId: this.user.id,
          id: 0,
          blockedDate: undefined,
          blockerId: 0
        };
        this.blockService.unblockOtherUser(block).subscribe(() => {
          this.isBlocked = false;
          this.snackBar.open('User successfully unblocked', 'OK', { duration: 3000 });
        });
      }
    });
  }

  blockUser(): void {
    const dialogRef = this.dialog.open(ConfirmationFormComponent, {
      width: '27em',
      data: { message: `Are you sure you want to block ${this.user.firstName} ${this.user.lastName}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const block: Block = {
          blockedId: this.user.id,
          id: 0,
          blockedDate: undefined,
          blockerId: 0
        };
        this.blockService.blockOtherUser(block).subscribe(() => {
          this.isBlocked = true;
          this.snackBar.open('User successfully blocked', 'OK', { duration: 3000 });
        });
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
          data: { userId: this.user.id },
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
