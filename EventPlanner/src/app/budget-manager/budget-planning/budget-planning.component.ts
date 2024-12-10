import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditBudgetItemComponent } from '../edit-budget-item/edit-budget-item.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './../../services/category-service.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../../services/event.service';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { BudgetItem } from '../../models/budget-item.model';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.css']
})
export class BudgetPlanningComponent implements OnInit {
  event: Event | null = null;
  categories$: Category[] = [];
  budgetItems: BudgetItem[] = [];
  totalBudget: number = 0;

  constructor(
    public budgetService: BudgetService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  budgetForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    maxAmount: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  // TODO: fix fixed event id value
  ngOnInit(): void {
    // Fetch event based on route params
    this.route.params.subscribe((params) => {
      const eventId = +params['id'];
      this.eventService.getEventById(1).subscribe({
        next: (event) => {
          this.event = event;
          
          // Load categories from CategoryService
          this.categoryService.getCategories().subscribe({
            next: (categories) => {
              this.categories$ = categories;
            },
            error: (err) => {
              console.error('Error fetching categories:', err);
            }
          });

          this.loadBudgetItems();
        },
        error: (err) => {
          console.error('Error fetching event:', err);
        }
      });
    });
  }

  loadBudgetItems() {
    this.budgetService.getBudgetItems().subscribe({
      next: (budgetItems: BudgetItem[]) => {
        this.budgetItems = budgetItems;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error fetching budget items:', err);
      },
    });;
  }

  addItem() {
    if (this.budgetForm.valid) {
      const budgetItem: BudgetItem = {
        id: Math.random(),
        maxAmount: this.budgetForm.value.maxAmount!,
        categoryName: this.budgetForm.value.categoryName!,
      };
  
      this.budgetService.createBudgetItem(budgetItem, 1).subscribe({
        next: (savedItem: BudgetItem) => {
          this.budgetItems = [...this.budgetItems, savedItem];
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error adding budget item:', err);
        },
      });
      this.budgetForm.reset();
    }
  }

  editItem(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditBudgetItemComponent, {
      width: '500px',
      data: {
        budgetItem: { ...item },
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this.budgetService.deleteBudgetItem(item.id).subscribe({
            next: () => {
              this.loadBudgetItems();
            },
            error: (err) => {
              console.error('Error fetching budgetItems:', err);
            }
          });
        } else {
          this.budgetService.updateBudgetItem(result).subscribe({
            next: () => {
              this.loadBudgetItems();
            },
            error: (err) => {
              console.error('Error fetching budgetItems:', err);
            }
          });        
        }
      }
    });
  }

  calculateTotal() {
    if (this.event) {
      this.budgetService.calculateTotalBudget(1).subscribe({
        next: (totalBudget: number) => {
          this.totalBudget = totalBudget;
        },
        error: (err) => {
          console.error('Error calculating total budget:', err);
        }
      });
    }
  }

  showItemDetails() {
    alert(`Details Display Not Done Yet!`);
  }
}
