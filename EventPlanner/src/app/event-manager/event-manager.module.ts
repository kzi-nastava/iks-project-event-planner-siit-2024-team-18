import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InviteScreenComponent } from './invite-screen/invite-screen.component';
import { CardsModule } from '../cards/cards.module';
import { FavouriteEventsComponent } from './favourite-events/favourite-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    InviteScreenComponent,
    FavouriteEventsComponent,
    CreateEventComponent,
    EditEventComponent,
    EventsComponent,
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
    FavouriteEventsComponent
  ],
})
export class EventManagerModule {}
