import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteProductsComponent } from './favourite-products/favourite-products.component';
import { MaterialModule } from '../infrastructure/material/material.module';

@NgModule({
  declarations: [
  
    FavouriteProductsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FavouriteProductsComponent
  ]
})
export class ProductManagerModule { }