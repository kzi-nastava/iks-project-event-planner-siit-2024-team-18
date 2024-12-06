import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventManagerModule } from '../event-manager/event-manager.module';
import { ServiceManagerModule } from '../service-manager/service-manager.module';
import { ProductManagerModule } from '../product-manager/product-manager.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    CalendarComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    EventManagerModule,
    ServiceManagerModule,
    ProductManagerModule
  ]
})
export class UserManagerModule { }
