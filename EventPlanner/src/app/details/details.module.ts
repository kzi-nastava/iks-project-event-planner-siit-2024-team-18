import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProductServiceDetailsComponent } from './product-service-details/product-service-details.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';

@NgModule({
  declarations: [
    EventDetailsComponent,
    ServiceDetailsComponent,
    ProductServiceDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventDetailsComponent,
    ProductServiceDetailsComponent
  ]
})
export class DetailsModule { }