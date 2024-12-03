import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InviteScreenComponent } from './invite-screen/invite-screen.component';
import { InvitedEventsComponent } from './invited-events/invited-events.component';
import { CardsModule } from '../cards/cards.module';

@NgModule({
  declarations: [
    InviteScreenComponent,
    InvitedEventsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CardsModule,
    RouterModule
  ],
  exports: [
    InviteScreenComponent,
    InvitedEventsComponent
  ],
})
export class EventManagerModule {}
