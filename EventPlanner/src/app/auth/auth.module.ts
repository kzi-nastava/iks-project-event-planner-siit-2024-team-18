import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { FastRegistrationComponent } from './fast-registration/fast-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    FastRegistrationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    RegistrationComponent,
    FastRegistrationComponent
  ]
})
export class AuthModule { }