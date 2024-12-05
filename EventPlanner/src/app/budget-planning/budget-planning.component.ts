import { Component } from '@angular/core';
import { BudgetItem, BudgetPlanningService } from '../services/budget-planning.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.css']
})
export class BudgetPlanningComponent {
  budgetForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    plannedAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  selectedItem: BudgetItem | null = null;

  constructor(public budgetPlanningService: BudgetPlanningService) {
  }

  addItem() {
    if (this.budgetForm.valid) {
      const newItem: BudgetItem = {
        id: Math.random(),
        name: this.budgetForm.value.name!,
        category: this.budgetForm.value.category!,
        plannedAmount: this.budgetForm.value.plannedAmount!,
        isEditing: false
      };
      this.budgetPlanningService.addBudgetItem(this.budgetPlanningService.event, newItem);
      this.budgetForm.reset();
    }
  }
  
  isFormValid() {
    const { selectedCategory, newBudgetItem } = this.budgetPlanningService;
    return selectedCategory && newBudgetItem.name && newBudgetItem.plannedAmount;
  }
  
  resetForm() {
    this.budgetPlanningService.newBudgetItem = { 
        id: 0, 
        name: '', 
        category: '',
        plannedAmount: 0, 
        isEditing: false 
    };
    this.budgetPlanningService.selectedCategory = null;
}

  editItem(item: BudgetItem) {
    this.selectedItem = { ...item };
  }

  closeModal() {
    this.selectedItem = null;
  }

  deleteItem() {
    if (this.selectedItem) {
      this.budgetPlanningService.deleteBudgetItem(this.budgetPlanningService.event, this.selectedItem.id);
      this.closeModal();
    }
  }

  updateItem() {
    if (this.selectedItem && this.selectedItem.name != "" && this.selectedItem.plannedAmount >= 0) {
      this.budgetPlanningService.updateBudgetItem(this.budgetPlanningService.event, this.selectedItem.id, this.selectedItem.plannedAmount, this.selectedItem.name);
      this.closeModal();
    }
  }

  calculateTotal() {
    return this.budgetPlanningService.calculateTotalBudget(this.budgetPlanningService.event);
  }

  showItemDetails() {
    alert(`Details Display Not Done Yet!`);
  }
}
