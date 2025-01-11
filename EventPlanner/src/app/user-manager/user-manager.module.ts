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
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { ConfirmationFormComponent } from './confirmation-form/confirmation-form.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';
import { ReportsComponent } from './reports/reports.component';
import { CardsModule } from "../cards/cards.module";
import { SuspensionDialogComponent } from './suspension-dialog/suspension-dialog.component';
import { CommentRequestsComponent } from './comment-requests/comment-requests.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    CalendarComponent,
    EditProfileComponent,
    FavouriteSolutionsComponent,
    OtherUserProfileComponent,
    ConfirmationFormComponent,
    SubmitReportComponent,
    ReportsComponent,
    SuspensionDialogComponent,
    CommentRequestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    EventManagerModule,
    RouterModule,
    CardsModule
]
})
export class UserManagerModule { }
