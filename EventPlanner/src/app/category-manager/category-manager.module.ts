import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { CategoryManagerComponent } from './category-types/category-manager.component';
import { CategoryReviewComponent } from './category-review/category-review.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [
    CategoryReviewComponent,
    CategoryManagerComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ]
})
export class CategoryManagerModule { }
