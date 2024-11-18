import { Component, ViewChild } from '@angular/core';
import { EmailComponent } from '../email/email.component';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(EmailComponent) emailComponent!: EmailComponent;
  @ViewChild(PasswordComponent) passwordComponent!: PasswordComponent;

  onSubmit() {
    this.emailComponent.validateOnSubmit();
    this.passwordComponent.validateOnSubmit();
  }
}
