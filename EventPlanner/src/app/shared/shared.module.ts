import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from './../infrastructure/material/material.module';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { CardsModule } from "../cards/cards.module";

@NgModule({
  declarations: [
    SearchBarComponent,
    DeleteFormComponent,
    NavbarComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CardsModule
],
  exports: [
    SearchBarComponent,
    NavbarComponent,
    NotificationsComponent
  ]
})
export class SharedModule {}
