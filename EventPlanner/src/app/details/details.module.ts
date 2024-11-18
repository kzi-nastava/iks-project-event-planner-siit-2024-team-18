import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProductServiceDetailsComponent } from './product-service-details/product-service-details.component';

@NgModule({
  declarations: [
    EventDetailsComponent,
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