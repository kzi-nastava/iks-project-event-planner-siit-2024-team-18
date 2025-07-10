import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { PurchaseProductDialogComponent } from './purchase-product-dialog/purchase-product-dialog.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { EditPricelistComponent } from './edit-pricelist/edit-pricelist.component';
import { RatingDialogComponent } from './rating/rating-dialog.component';

@NgModule({
  declarations: [
    EventDetailsComponent,
    ServiceDetailsComponent,
    ProductDetailsComponent,
    PurchaseProductDialogComponent,
    RatingDialogComponent,
    PricelistComponent,
    EditPricelistComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    EventDetailsComponent,
    ProductDetailsComponent,
    ServiceDetailsComponent,
    PurchaseProductDialogComponent,
    RatingDialogComponent,
  ]
})
export class DetailsModule { }