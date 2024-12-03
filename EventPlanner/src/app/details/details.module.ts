import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    EventDetailsComponent,
    ServiceDetailsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EventDetailsComponent,
    ProductDetailsComponent,
    ServiceDetailsComponent,
  ]
})
export class DetailsModule { }