import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetItem } from '../../models/budget-item.model';

@Component({
  selector: 'app-edit-budget-item',
  templateUrl: './edit-budget-item.component.html',
  styleUrls: ['./edit-budget-item.component.css']
})
export class EditBudgetItemComponent implements OnInit {
  editForm: FormGroup;
  budgetItem!: BudgetItem;

  constructor(
    public dialogRef: MatDialogRef<EditBudgetItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { budgetItem: BudgetItem }
  ) {
    this.editForm = new FormGroup({
      maxAmount: new FormControl(data.budgetItem.maxAmount, [ Validators.required, Validators.min(0) ]),
    });
    this.budgetItem = data.budgetItem;
  }

  ngOnInit(): void {}

  save() {
    if (this.editForm.valid) {
      const updatedItem = {
        ...this.data.budgetItem,
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedItem);
    }
  }

  delete() {
    this.dialogRef.close({ delete: true });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
