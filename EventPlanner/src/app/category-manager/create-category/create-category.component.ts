import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  newCategory: Category = {
    id: 0, 
    name: '', 
    description: '', 
    isDeleted: false, 
    status: 'PENDING'
  };

  constructor(private dialogRef: MatDialogRef<CreateCategoryComponent>) {}

  onSave(): void {
    if (this.newCategory.name.trim() && this.newCategory.description.trim()) {
      this.dialogRef.close(this.newCategory);
    } else {
      alert('Please fill out all required fields!');
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
