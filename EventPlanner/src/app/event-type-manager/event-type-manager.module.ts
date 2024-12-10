import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypesComponent } from './event-types/event-types.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import { EditEventTypeComponent } from './edit-event-type/edit-event-type.component';

@NgModule({
  declarations: [
    EventTypesComponent,
    CreateEventTypeComponent,
    EditEventTypeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class EventTypeManagerModule { }
