import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-filters',
  templateUrl: './service-filters.component.html',
  styleUrls: ['./service-filters.component.css'],
})
export class ServiceFiltersComponent {
  selectedCategory: string = '';
  selectedEventTypes: string = '';
  isAvailable: boolean = true;
  minPrice: number | null = 0;
  maxPrice: number | null = 0;

  categories: string[] = ['Photography', 'Catering', 'Decorations', 'DJ Services'];
  eventTypes: string[] = ['Wedding', 'Birthday', 'Corporate', 'Party'];

  constructor(public dialogRef: MatDialogRef<ServiceFiltersComponent>) {}

  resetFilters(): void {
    this.dialogRef.close({
      category: "",
      eventType: "",
      isAvailable: true,
      minPrice: 0,
      maxPrice: 0,
    });
  }

  applyFilters(): void {
    this.dialogRef.close({
      category: this.selectedCategory || "",
      eventType: this.selectedEventTypes || "",
      isAvailable: this.isAvailable,
      minPrice: this.minPrice !== 0 ? this.minPrice : 0,
      maxPrice: this.maxPrice !== 0 ? this.maxPrice : 0,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
