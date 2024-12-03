import { Component } from '@angular/core';

@Component({
  selector: 'app-invite-screen',
  templateUrl: './invite-screen.component.html',
  styleUrls: ['./invite-screen.component.css']
})
export class InviteScreenComponent {
  email: string = '';
  emailList: string[] = [];

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
      console.log('Sending invites to:', this.emailList);
      alert('Invites sent!');
    } else {
      alert('No emails to send!');
    }
  }

  closeInviteScreen() {
    console.log('Invite screen closed.');
  }
}
