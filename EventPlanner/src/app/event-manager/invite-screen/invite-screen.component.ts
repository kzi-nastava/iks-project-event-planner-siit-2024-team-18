import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-screen',
  templateUrl: './invite-screen.component.html',
  styleUrls: ['./invite-screen.component.css']
})
export class InviteScreenComponent {
  email: string = '';
  emailList: string[] = [];
  eventId: number = 14;
  isSending: boolean = false;

  constructor(private emailService: EmailService,private router: Router) {}

  addEmail() {
    if (this.email && !this.emailList.includes(this.email)) {
      this.emailList.push(this.email);
      this.email = '';
    }
  }

  removeEmail(index: number) {
    this.emailList.splice(index, 1);
  }

  sendInvites() {
    if (this.emailList.length > 0) {
      this.isSending = true;
      this.emailService.sendEventInvitations(this.eventId, this.emailList).subscribe({
        next: () => {
          alert('Invites sent successfully!');
          this.emailList = [];
        },
        error: (err) => {
          alert('Failed to send invites. Please try again later.');
          this.isSending = false;
        },
        complete: () => {
          this.isSending = false;
        }
      });
    } else {
      alert('No emails to send!');
    }
  }

  closeInviteScreen() {
    this.router.navigate(['']);
  }
}
