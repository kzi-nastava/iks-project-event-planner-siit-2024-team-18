import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-service-filters',
  templateUrl: './service-filters.component.html',
  styleUrls: ['./service-filters.component.css'],
})
export class ServiceFiltersComponent {
  selectedCategory: string = '';
  selectedEventType: string = '';
  public: boolean | null = null;
  minPrice: number | null = 0;
  maxPrice: number | null = 0;
  creatorName: string = '';

  categories: string[] = ['Photography', 'Catering', 'Decorations', 'DJ Services'];
  eventTypes: string[] = ['Wedding', 'Birthday', 'Corporate', 'Party'];

  constructor(public dialogRef: MatDialogRef<ServiceFiltersComponent>) {}

  resetFilters(): void {
    this.dialogRef.close({
      category: "",
      eventType: "",
      public: null,
      minPrice: 0,
      maxPrice: 0,
      creatorName: "",
    });
  }

  applyFilters(): void {
    this.dialogRef.close({
      category: this.selectedCategory || "",
      eventType: this.selectedEventType || "",
      public: this.public !== null ? this.public : null,
      minPrice: this.minPrice !== 0 ? this.minPrice : 0,
      maxPrice: this.maxPrice !== 0 ? this.maxPrice : 0,
      creatorName: this.creatorName || "",
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
