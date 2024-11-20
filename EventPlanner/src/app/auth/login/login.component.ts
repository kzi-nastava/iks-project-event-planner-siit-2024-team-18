import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  

  passwordHidden = true;

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const user = this.userService.login(email, password);

    if (this.loginForm.valid) {
      if (user) {
        this.authService.setUser(user);
        this.router.navigate(['']);
      } else {
        alert('User with this credentials doesn\'t exist!');
      }
    }
  }

  submit() {
    this.loginForm.markAllAsTouched();
    this.login();
  }
}
