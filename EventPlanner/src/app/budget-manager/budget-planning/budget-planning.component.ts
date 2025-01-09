import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditBudgetItemComponent } from '../edit-budget-item/edit-budget-item.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from './../../services/category-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../services/event.service';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { BudgetItem } from '../../models/budget-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.css']
})
export class BudgetPlanningComponent implements OnInit {
  event!: Event;
  categories$: Category[] = [];
  budgetItems: BudgetItem[] = [];
  totalBudget: number = 0;

  constructor(
    public budgetService: BudgetService,
    private categoryService: CategoryService,
    private eventService: EventService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  budgetForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    maxAmount: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const eventId = +params['id'];
      this.eventService.getEventByIdForBudget(eventId).subscribe({
        next: (event) => {
          this.event = event;
          
          this.categoryService.getCategoriesByEventId(eventId).subscribe({
            next: (categories) => {
              this.categories$ = categories;
            },
            error: (err) => {
              console.error('Error fetching categories:', err);
              this.snackBar.open('Error fetching categories.', 'OK', {
                duration: 3000,
              });
            }
          });

          this.loadBudgetItems();
        },
        error: (err) => {
          console.error('Error fetching event:', err);
          this.snackBar.open('Error fetching event.', 'OK', {
            duration: 3000,
          });
        }
      });
    });
  }

  loadBudgetItems() {
    this.budgetService.getBudgetItems(this.event.id).subscribe({
      next: (budgetItems: BudgetItem[]) => {
        this.budgetItems = budgetItems;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error fetching budget items:', err);
        this.snackBar.open('Error fetching budget items.', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  addItem() {
    if (this.budgetForm.valid) {
      const budgetItem: BudgetItem = {
        id: Math.random(),
        maxAmount: this.budgetForm.value.maxAmount!,
        categoryName: this.budgetForm.value.categoryName!,
      };
  
      this.budgetService.createBudgetItem(budgetItem, this.event.id).subscribe({
        next: (savedItem: BudgetItem) => {
          this.budgetItems = [...this.budgetItems, savedItem];
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Error adding budget item:', err);
          this.snackBar.open('Error adding budget item.', 'OK', {
            duration: 3000,
          });
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
              this.snackBar.open('Error fetching budgetItems.', 'OK', {
                duration: 3000,
              });
            }
          });
        } else {
          this.budgetService.updateBudgetItem(result).subscribe({
            next: () => {
              this.loadBudgetItems();
            },
            error: (err) => {
              console.error('Error fetching budgetItems:', err);
              this.snackBar.open('Error fetching budgetItems.', 'OK', {
                duration: 3000,
              });
            }
          });        
        }
      }
    });
  }

  details() {
    this.router.navigate(['/events/edit/budget-planning/' + this.event.id + '/details']);
  }

  calculateTotal() {
    if (this.event) {
      this.budgetService.calculateTotalBudget(this.event.id).subscribe({
        next: (totalBudget: number) => {
          this.totalBudget = totalBudget;
        },
        error: (err) => {
          console.error('Error calculating total budget:', err);
          this.snackBar.open('Error calculating total budget.', 'OK', {
            duration: 3000,
          });
        }
      });
    }
  }

  showItemDetails() {
    alert(`Details Display Not Done Yet!`);
  }
}
