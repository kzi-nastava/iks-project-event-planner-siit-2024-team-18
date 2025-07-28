import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../infrastructure/material/material.module';

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
