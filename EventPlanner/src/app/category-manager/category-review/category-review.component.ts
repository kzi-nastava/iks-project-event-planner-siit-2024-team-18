import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../services/category-service.service';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { Category } from '../../models/category.model';
import { CategoryReviewEditComponent } from '../category-review-edit/category-review-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-review',
  templateUrl: './category-review.component.html',
  styleUrls: ['./category-review.component.css']
})
export class CategoryReviewComponent {
  reviewCategories: Category[] = [];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
  ) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getReviewCategories()
    .subscribe({
      next: (data: Category[]) => {
        this.reviewCategories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  approveSuggestion(event: MouseEvent, category: Category, id: number) {
    event.stopPropagation();
    this.categoryService.approveSuggestion(category, id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (err) => {
        console.error('Error approving categories:', err);
        this.snackBar.open('Error approving categories!', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  editSuggestion(suggestion: Category) {
    const dialogRef = this.dialog.open(CategoryReviewEditComponent, {
      width: '500px',
      data: { category: suggestion }
    });
  
    dialogRef.afterClosed().subscribe(updatedCategory => {
      if (updatedCategory) {
        this.categoryService.updateCategoryReview(updatedCategory, suggestion.id).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            console.error('Error updating category:', err);
            this.snackBar.open('Error updating category!', 'OK', {
              duration: 3000,
            });
          }
        });
      }
    });
  }
  
  deleteSuggestion(event: MouseEvent, id: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this category?' }
    });

    dialogRef.afterClosed().subscribe(deleteCategory => {
      if (deleteCategory) {
        this.categoryService.deleteReviewCategory(id).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            console.error('Error fetching categories:', err);
          },
        });;
      }
    });
  }
}
