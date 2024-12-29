import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryService } from '../../services/category-service.service';
import { Category } from '../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent {
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.loadCategories();
  }
  categories: Category[] = [];

  loadCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((newCategory: Category) => {
      if (newCategory) {
        this.categoryService.addCategory(newCategory)
        .subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            console.error('Error fetching categories:', err);
            this.snackBar.open('Error fetching categories!', 'OK', {
              duration: 3000,
            });
          },
        });
        this.loadCategories();
      }
    });
  }

  openEditModal(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '500px',
      data: { category }
    });

    dialogRef.afterClosed().subscribe((updatedCategory: Category) => {
      if (updatedCategory) {
        this.categoryService.updateCategory(updatedCategory, updatedCategory.id)
        .subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            console.error('Error fetching categories:', err);
            this.snackBar.open('Error fetching categories!', 'OK', {
              duration: 3000,
            });
          },
        });
        this.loadCategories();
      }
    });
  }

  deleteCategory(event: MouseEvent, id: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this category?' }
    });

    dialogRef.afterClosed().subscribe(deleteCategory => {
      if (deleteCategory) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            console.error('Category already in use:', err);
            this.snackBar.open('Category already in use!', 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
