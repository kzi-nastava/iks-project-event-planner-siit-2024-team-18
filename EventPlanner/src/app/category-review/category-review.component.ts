import { Component } from '@angular/core';

@Component({
  selector: 'app-category-review',
  templateUrl: './category-review.component.html',
  styleUrls: ['./category-review.component.css']
})
export class CategoryReviewComponent {
  categories: Category[] = [
    { id: 0, name: 'ALL', description: '-', status: 'ACCEPTED', isDeleted: false },
    { id: 1, name: 'Venue', description: 'Venue Description', status: 'ACCEPTED', isDeleted: false },
    { id: 2, name: 'Catering', description: 'Catering Description', status: 'ACCEPTED', isDeleted: false }
  ];

  get filteredCategories(): Category[] {
    return this.categories.filter(category => category.name !== 'ALL');
  }

  selectedCategory: Category | null = null;
  originalCategory: Category | null = null;

  approveSuggestion(event: MouseEvent, suggestion: Category) {
    event.stopPropagation();
    alert(`Suggestion ${suggestion.name} approved.`);
  }

  editSuggestion(suggestion: Category) {
    this.originalCategory = suggestion;
    this.selectedCategory = { ...suggestion };
  }

  deleteSuggestion(event: MouseEvent, suggestion: Category) {
    event.stopPropagation();
    alert(`Suggestion ${suggestion.name} deleted.`);
  }

  assignExistingCategory(suggestion: Category) {
    alert(`Existing category assigned for ${suggestion.name}.`);
  }

  closeModal() {
    this.selectedCategory = null;
    this.originalCategory = null;
  }

  save(selectedCategory: Category) {
    if (selectedCategory && selectedCategory.name && selectedCategory.description) {
      if (this.originalCategory) {
        this.originalCategory.name = selectedCategory.name;
        this.originalCategory.description = selectedCategory.description;
      }
      this.closeModal();
    }
  }

  onCategorySelectionChange(selected: Category) {
    if (selected) {
      this.selectedCategory = { ...selected };
    }
  }

  isAllCategorySelected(): boolean {
    return this.selectedCategory?.name === 'ALL';
  }
}

export interface Category {
  id: number;
  name: string;
  description: string;
  status: 'PENDING' | 'ACCEPTED' | 'DENIED';
  isDeleted: boolean;
}
