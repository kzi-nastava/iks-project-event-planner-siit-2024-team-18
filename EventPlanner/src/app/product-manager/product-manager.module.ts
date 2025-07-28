import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { ProductsComponent } from './products/products.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CreateProductComponent,
        EditProductComponent,
        ProductFiltersComponent,
        ProductsComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [ProductsComponent],
})
export class ProductManagerModule {}
