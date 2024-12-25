import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventManagerModule } from '../event-manager/event-manager.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavouriteSolutionsComponent } from './favourite-solutions/favourite-solutions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserProfileComponent,
    CalendarComponent,
    EditProfileComponent,
    FavouriteSolutionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    EventManagerModule,
    RouterModule
  ]
})
export class UserManagerModule { }
