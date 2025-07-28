import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBudgetItemComponent } from './edit-budget-item/edit-budget-item.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { PurchasedSolutionDetailsComponent } from '../budget-manager/purchased-solution-details/purchased-solution-details.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    EditBudgetItemComponent,
    BudgetPlanningComponent,
    PurchasedSolutionDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ]
})
export class BudgetManagerModule { }
