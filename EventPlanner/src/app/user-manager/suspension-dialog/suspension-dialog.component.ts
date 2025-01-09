import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-suspension-dialog',
  templateUrl: './suspension-dialog.component.html',
  styleUrls: ['./suspension-dialog.component.css']
})
export class SuspensionDialogComponent implements OnInit {
  remainingTime: string = '';

  constructor(
    public dialogRef: MatDialogRef<SuspensionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { suspensionEndDate: string }
  ) {}

  ngOnInit(): void {
    this.calculateRemainingTime();
  }

  calculateRemainingTime(): void {
    const endDate = new Date(this.data.suspensionEndDate);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.remainingTime = `${days} days, ${hours} hours, and ${minutes} minutes`;
    } else {
      this.remainingTime = '0 days, 0 hours, and 0 minutes';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
