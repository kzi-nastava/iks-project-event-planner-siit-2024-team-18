import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { ProductServiceCardComponent } from './product-service-card/product-service-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    ProductServiceCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent,
    ProductServiceCardComponent
  ]
})
export class CardsModule { }