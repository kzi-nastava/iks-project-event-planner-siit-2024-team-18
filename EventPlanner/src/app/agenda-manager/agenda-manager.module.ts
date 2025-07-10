import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda/agenda.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AgendaComponent,
    EditActivityComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class AgendaManagerModule { }
