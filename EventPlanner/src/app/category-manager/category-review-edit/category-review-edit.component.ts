import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'app-category-review-edit',
  templateUrl: './category-review-edit.component.html',
  styleUrls: ['./category-review-edit.component.css']
})
export class CategoryReviewEditComponent {
  category: Category;
  categories: Category[] = [];
  isFieldsDisabled: boolean = false;
  originalCategory: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryReviewEditComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {
    this.category = { ...data.category };
    this.originalCategory = { ...data.category };

    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = [{ id: -1, name: 'No Category', description: '', isDeleted: false, status: 'PENDING' }, ...data];
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  save() {
    if (this.category.name && this.category.description) {
      this.dialogRef.close(this.category);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

  onCategorySelectionChange(selectedCategory: Category) {
    if (selectedCategory.name === 'No Category') {
      this.isFieldsDisabled = false;
      this.category = { ...this.originalCategory };
    } else {
      this.isFieldsDisabled = true;
      this.category = { ...selectedCategory };
    }
  }
}
