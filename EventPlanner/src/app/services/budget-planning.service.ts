import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BudgetPlanningService {
    categories: Category[] = [
      { id: 1, name: 'Venue', type: 'service' },
      { id: 2, name: 'Catering', type: 'service' },
      { id: 3, name: 'Decor', type: 'product' },
    ];

    event: Event = {
      id: 1,
      name: 'Sample Event',
      eventType: 'Wedding',
      budget: []
    }

    selectedCategory: Category | null = null;

    newBudgetItem: BudgetItem = { id: 0, name: '', category: '', plannedAmount: 0, isEditing: false };

    calculateTotalBudget(event: Event): number {
        return event.budget.reduce((sum, item) => sum + item.plannedAmount, 0);
    }

    addBudgetItem(event: Event, item: BudgetItem) {
        event.budget.push(item);
    }

    updateBudgetItem(event: Event, itemId: number, newAmount: number, newName: string) {
        const item = event.budget.find(b => b.id === itemId);
        if (item) {
        item.name = newName;
        item.plannedAmount = newAmount;
        }
    }

    deleteBudgetItem(event: Event, itemId: number) {
        const itemIndex = event.budget.findIndex(b => b.id === itemId);
        if (itemIndex !== -1) {
        event.budget.splice(itemIndex, 1);
        }
    }
}

export interface Event {
    id: number;
    name: string;
    eventType: string;
    budget: BudgetItem[];
}
  
export interface Category {
    id: number;
    name: string;
    type: 'product' | 'service';
}
  
export interface BudgetItem {
    id: number;
    name: string;
    category: string;
    plannedAmount: number;
    isEditing: boolean;
}
  