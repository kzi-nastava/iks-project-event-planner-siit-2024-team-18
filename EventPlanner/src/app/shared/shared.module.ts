import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from './../infrastructure/material/material.module';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchBarComponent,
    DeleteFormComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SearchBarComponent,
    NavbarComponent
  ]
})
export class SharedModule {}
