import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventTypeService } from '../../services/event-type.service';
import { CategoryService } from '../../services/category-service.service';

@Component({
    selector: 'app-product-filters',
    templateUrl: './product-filters.component.html',
    styleUrls: ['./product-filters.component.css'],
})
export class ProductFiltersComponent implements OnInit {
    selectedCategory: string = '';
    selectedEventTypes: string = '';
    isAvailable: boolean = true;
    minPrice: number | null = 0;
    maxPrice: number | null = 0;

    categories: string[] = [];
    eventTypes: string[] = [];

    constructor(
        public dialogRef: MatDialogRef<ProductFiltersComponent>,
        private eventTypeService: EventTypeService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.loadEventTypes();
        this.loadCategories();
    }

    loadEventTypes(): void {
        this.eventTypeService.getAll().subscribe({
            next: (data) => {
                this.eventTypes = data.map((eventType) => eventType.name);
            },
            error: (err) => console.error('Error fetching event types:', err),
        });
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (data) => {
                this.categories = data.map((category) => category.name);
            },
            error: (err) => console.error('Error fetching categories:', err),
        });
    }

    resetFilters(): void {
        this.dialogRef.close({
            category: '',
            eventType: '',
            isAvailable: true,
            minPrice: 0,
            maxPrice: 0,
        });
    }

    applyFilters(): void {
        this.dialogRef.close({
            category: this.selectedCategory || '',
            eventType: this.selectedEventTypes || '',
            isAvailable: this.isAvailable,
            minPrice: this.minPrice !== 0 ? this.minPrice : 0,
            maxPrice: this.maxPrice !== 0 ? this.maxPrice : 0,
        });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
