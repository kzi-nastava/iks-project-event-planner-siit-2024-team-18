import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent
  ]
})
export class CardsModule { }