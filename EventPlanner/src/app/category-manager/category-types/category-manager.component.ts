import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent {
  constructor(private dialog: MatDialog) {}

  categories: Category[] = [
    { id: 1, name: 'Venue', description: 'Venue Description', status: 'ACCEPTED', isDeleted: false },
    { id: 2, name: 'Catering', description: 'Catering Description', status: 'ACCEPTED', isDeleted: false }
  ];

  isCreateModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  selectedCategory: Category | null = null;
  newCategory: Category = { id: 0, name: '', description: '', status: 'PENDING', isDeleted: false };

  openCreateModal() {
    this.newCategory = { id: 0, name: '', description: '', status: 'PENDING', isDeleted: false };
    this.isCreateModalVisible = true;
    this.isEditModalVisible = false;
  }

  openEditModal(category: Category) {
    this.selectedCategory = { ...category };
    this.isEditModalVisible = true;
    this.isCreateModalVisible = false;
  }

  createCategory() {
    if (this.newCategory.name && this.newCategory.description) {
      this.newCategory.id = this.categories.length + 1;
      this.categories.push(this.newCategory);
      this.closeModal();
    }
  }

  saveEditedCategory() {
    if (this.selectedCategory) {
      const index = this.categories.findIndex(c => c.id === this.selectedCategory!.id);
      if (index !== -1) {
        this.categories[index] = this.selectedCategory;
      }
      this.closeModal();
    }
  }

  deleteCategory(event: MouseEvent, id: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this category?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categories = this.categories.filter(c => c.id !== id);
      }
    });
  }

  closeModal() {
    this.isCreateModalVisible = false;
    this.isEditModalVisible = false;
    this.selectedCategory = null;
  }
}

export interface Category {
  id: number;
  name: string;
  description: string;
  status: 'PENDING' | 'ACCEPTED' | 'DENIED';
  isDeleted: boolean;
}
