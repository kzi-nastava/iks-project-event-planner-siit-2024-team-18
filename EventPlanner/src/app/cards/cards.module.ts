import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ServiceCardComponent } from './service-card/service-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
  ]
})
export class CardsModule { }