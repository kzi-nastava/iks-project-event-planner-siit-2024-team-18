import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login } from '../model/login.model';
import { AuthResponse } from '../model/auth-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
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
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      };
  
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser();
          this.router.navigate(['home']);
        },
        error: (err) => {
          if (err.status === 404) {
            this._snackBar.open('User with email ' + this.loginForm.value.email + ' not found.', 'OK');
          } else if (err.status === 400) {
            this._snackBar.open('Incorrect password. Please try again.', 'OK');
          } else {
            this._snackBar.open('An unexpected error occurred', 'OK');
          }
        }
      });
    }
  }

  submit() {
    this.loginForm.markAllAsTouched();
    this.login();
  }
}
