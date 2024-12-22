import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
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
  }

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((user) => {
      this.user = user!;
    });
  }

  deactivate(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '27em',
      data: { message: 'Are you sure you want to deactivate your profile?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id);
      }
    });
  }
}
