import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteService } from '../../services/invite.service';
import { UpdatedInvite } from '../../models/updated-invite.model';
import { RegistrationRequestService } from '../../services/registration-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inviteService: InviteService,
    private registrationRequestService: RegistrationRequestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const inviteId = params['inviteId'];
      if (inviteId) {
        this.acceptInvite(Number(inviteId));
      }
      const id = params['id'];
      if (id) {
        this.activateAccount(Number(id));
      }
    });
  }

  private acceptInvite(inviteId: number): void {
    this.inviteService.acceptInvite(inviteId).subscribe(
      (response: UpdatedInvite) => {
        console.log('Invite accepted:', response);
        if (response.loggedIn) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error accepting invite:', error);
      }
    );
  }

  private activateAccount(id: number): void {
    this.registrationRequestService.activateAccount(id).subscribe(
      () => {
        this.snackBar.open('Successfuly activated account.', 'OK');
      },
      (error) => {
        if (error.status === 400) {
          this.snackBar.open('Activation link has expired.', 'OK');
        }
        else {
          this.snackBar.open('Unexpected error.', 'OK');
          console.error('Error accepting invite:', error);
        }
      }
    );
  }
}
