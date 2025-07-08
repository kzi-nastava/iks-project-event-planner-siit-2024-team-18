import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductManagerService } from '../../services/product-manager.service';
import { Service } from '../../models/service.model';
import { ServiceManagerService } from '../../services/service-manager.service';

@Component({
    selector: 'app-rating-dialog',
    templateUrl: './rating-dialog.component.html',
    styleUrls: ['./rating-dialog.component.css'],
})
export class RatingDialogComponent implements OnInit {
    commentControl = new FormControl('');
    selectedRating: number = 0;
    product: Product;
    service: Service;

    constructor(
        private productService: ProductManagerService,
        private serviceService: ServiceManagerService,
        public dialogRef: MatDialogRef<RatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { product: Product; service: Service }
    ) {
        this.product = data.product;
        this.service = data.service;
    }

    ngOnInit(): void {}

    setRating(value: number): void {
        this.selectedRating = value;
    }

    onDone(): void {
        this.dialogRef.close({
            rating: this.selectedRating,
            comment: this.commentControl.value,
        });

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (this.product) {
                    this.productService
                        .rateProduct(
                            this.product.id,
                            result.rating,
                            result.comment
                        )
                        .subscribe({
                            error: (err) => {
                                console.error('Failed to rate product:', err);
                            },
                        });
                    return;
                }
                this.serviceService
                    .rateService(this.service.id, result.rating, result.comment)
                    .subscribe({
                        error: (err) => {
                            console.error('Failed to rate service:', err);
                        },
                    });
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }
}
