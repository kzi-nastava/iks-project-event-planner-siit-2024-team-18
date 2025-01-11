import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { CommentRequestCardComponent } from './comment-request-card/comment-request-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent,
    ReportCardComponent,
    CommentRequestCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventCardComponent,
    ProductCardComponent,
    ServiceCardComponent,
    NotificationCardComponent,
    ReportCardComponent,
    CommentRequestCardComponent
  ]
})
export class CardsModule { }