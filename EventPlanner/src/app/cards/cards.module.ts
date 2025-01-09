import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { ReportCardComponent } from './report-card/report-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent,
    ReportCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent,
    ReportCardComponent
  ]
})
export class CardsModule { }