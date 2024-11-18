import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  passwordHidden = true;

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  submit() {
    this.email.markAsTouched();
    this.password.markAsTouched();
  }
}
