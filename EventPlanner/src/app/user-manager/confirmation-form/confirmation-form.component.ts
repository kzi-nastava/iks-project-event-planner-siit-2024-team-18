import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrl: './confirmation-form.component.css'
})
export class ConfirmationFormComponent {
  constructor(
      public dialogRef: MatDialogRef<ConfirmationFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close(true);
    }
  
    onCancel(): void {
      this.dialogRef.close(false);
    }
}
