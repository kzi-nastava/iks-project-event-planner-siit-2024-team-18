import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
  category: Category;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {
    this.category = { ...data.category };
  }

  onSave() {
    this.dialogRef.close(this.category);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
