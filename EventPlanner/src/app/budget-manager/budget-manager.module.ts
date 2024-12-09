import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBudgetItemComponent } from './edit-budget-item/edit-budget-item.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';

@NgModule({
  declarations: [
    EditBudgetItemComponent,
    BudgetPlanningComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class BudgetManagerModule { }
