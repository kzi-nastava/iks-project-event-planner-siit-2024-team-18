import { Component } from '@angular/core';
import { DeleteFormComponent } from '../shared/delete-form/delete-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent {
  constructor(
    private dialog: MatDialog,
  ) {}

  categories : Category[] = [
    { id: 1, name: 'Venue', description: 'Venue Description', status: 'ACCEPTED',  isDeleted: false},
    { id: 2, name: 'Catering', description: 'Catering Description', status: 'ACCEPTED',  isDeleted: false }
  ];

  isModalVisible : boolean = true;
  selectedCategory : Category | null = { id: 10, name: 'Decor', description: 'Flowers', status: 'ACCEPTED',  isDeleted: false};
  newCategory : Category = { id: 0, name: '', description: '', status: 'PENDING',  isDeleted: false};

  createCategory() {
    if (this.newCategory.name && this.newCategory.description) {
      this.newCategory.id = this.categories.length + 1;
      this.categories.push(
        this.newCategory
      );
      this.closeModal();
    }
  }

  updateCategory(id: number) {
    const category = this.categories.find((c) => c.id === id);
    if (category) {
      category.name = "asdfasdf";
    }  }

  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this category?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const category = this.categories.find((c) => c.id === id);
        if (category) {
          this.categories = this.categories.filter((c) => c.id !== id);
          alert(`Category ${category.name} deleted.`);
        }        
      };
    });

  }

  editCategory(id: number) {
    alert(`Category Edited!`);
    this.closeModal();
  }

  closeModal() {
    this.selectedCategory = null;
    this.isModalVisible = false;
  }
}

export interface Category {
  id: number;
  name: string;
  description: string;
  status: 'PENDING' | 'ACCEPTED' | 'DENIED';
  isDeleted: boolean;
}
