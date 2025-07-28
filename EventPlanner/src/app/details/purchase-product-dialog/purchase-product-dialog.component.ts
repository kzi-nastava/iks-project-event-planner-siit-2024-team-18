import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { EventService } from './../../services/event.service';
import { EventCard } from '../../models/event-card.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-purchase-product-dialog',
  templateUrl: './purchase-product-dialog.component.html',
  styleUrls: ['./purchase-product-dialog.component.css']
})
export class PurchaseProductDialogComponent implements OnInit {
  events: EventCard[] = [];
  eventControl: FormControl;
  product: Product;

  constructor(
    private eventService: EventService,
    public dialogRef: MatDialogRef<PurchaseProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.eventControl = new FormControl(null, [Validators.required]);
    this.product = data.product;
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllByCreator().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }

  onBuy(): void {
    if (this.eventControl.valid) {
      this.dialogRef.close(this.eventControl.value);
    } else {
      this.eventControl.markAsTouched();
    }
  }
}
