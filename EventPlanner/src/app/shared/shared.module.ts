import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from './../infrastructure/material/material.module';
import { DeleteFormComponent } from './delete-form/delete-form.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    DeleteFormComponent
  ],
  imports: [
  CommonModule,
  MaterialModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SharedModule {}
