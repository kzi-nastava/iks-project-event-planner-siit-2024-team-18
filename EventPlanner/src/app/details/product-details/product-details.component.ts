import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagerService } from '../../services/product-manager.service';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseProductDialogComponent } from '../purchase-product-dialog/purchase-product-dialog.component';
import { BudgetService } from './../../services/budget.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from '../../services/chat.service';
import { Grade } from '../../models/grade.model';
import { RatingDialogComponent } from '../rating/rating-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
    productId!: number;
    product!: Product;
    grade!: Grade;
    reviews: number = 0;
    isBlocked: boolean = false;
    currentImageIndex: number = 0;
    isFavorite: boolean = false;
    currentIndex: number = 0;
    swiperOffset: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductManagerService,
        private budgetService: BudgetService,
        private chatService: ChatService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = +params['id'];
            if (!isNaN(id)) {
                this.fetchProductDetails(id);
            } else {
                this.router.navigate(['']);
            }
        });
    }

    openBuyProductDialog(): void {
        if (this.product) {
            const dialogRef = this.dialog.open(PurchaseProductDialogComponent, {
                width: '40em',
                data: { product: this.product },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.budgetService
                        .buyProduct(this.product, result)
                        .subscribe({
                            next: () => {
                                this.openRatingDialog();
                            },
                            error: (err) => {
                                console.error(
                                    'Failed to purchase product. Budget item limit has been reached:',
                                    err
                                );
                                this.snackBar.open(
                                    'Failed to purchase product. Budget item limit has been reached.',
                                    'OK',
                                    {
                                        duration: 3000,
                                    }
                                );
                            },
                        });
                }
            });
        }
    }

    openRatingDialog() {
        const dialogRef = this.dialog.open(RatingDialogComponent, {
            width: '25em',
            data: { product: this.product },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                setTimeout(() => {
                    this.fetchRating(this.product.id);
                }, 500);
            }
        });
    }

    prevImage(): void {
        if (this.product?.images) {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.product.images.length - 1;
            }
            this.updateSwiperPosition();
        }
    }

    nextImage(): void {
        if (this.product?.images) {
            if (this.currentIndex < this.product.images.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.updateSwiperPosition();
        }
    }

    goToImage(index: number): void {
        if (this.product?.images) {
            this.currentIndex = index;
            this.updateSwiperPosition();
        }
    }

    private updateSwiperPosition(): void {
        this.swiperOffset = -this.currentIndex * 100;
    }

    fetchProductDetails(productId: number): void {
        this.productService.getProductById(productId).subscribe({
            next: (data: Product | null) => {
                if (data) {
                    this.product = data;
                } else {
                    this.isBlocked = true;
                }
            },
            error: (err) => {
                console.error('Failed to fetch product details:', err);
                this.router.navigate(['']);
            },
        });

        this.fetchRating(productId);
        this.fetchIsLiked();
    }

    fetchIsLiked() {
        this.userService.isLiked(this.product.id).subscribe({
            next: (data: Boolean) => {
                if (data) {
                    this.isFavorite = true;
                } else {
                    this.isFavorite = false;
                }
            }
        });
    }

    fetchRating(productId: number) {
        this.productService.getProductGrade(productId).subscribe({
            next: (data: Grade | null) => {
                if (data) {
                    this.grade = data;
                }
            },
            error: (err) => {
                console.error('Failed to fetch product grade:', err);
            },
        });

        this.productService.getNumberOfReviews(productId).subscribe({
            next: (data: number | null) => {
                if (data) {
                    this.reviews = data;
                }
            },
            error: (err) => {
                console.error('Failed to fetch product reviews:', err);
            },
        });
    }

    goBack(): void {
        this.router.navigate(['']);
    }

    toggleFavorite(): void {
        if (this.isFavorite) {
            this.removeFromFavourites();
            return;
        }

        this.userService.addSolutionToFavourites(this.product.id).subscribe({
            next: () => {
                this.isFavorite = true;
                this.snackBar.open('Solution added to favourites.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error adding solution to favourites:', err);
                this.snackBar.open('Solution not added to favourites.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    removeFromFavourites() {
        this.userService.removeSolutionFromFavourites(this.product.id).subscribe({
            next: () => {
                this.isFavorite = false;
                this.snackBar.open('Solution removed from favourites.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error removing solution from favourites:', err);
                this.snackBar.open('Solution not removed from favourites.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    calculateRating(): string {
        return '★'.repeat(this.grade.value) + '✰'.repeat(5 - this.grade.value);
    }

    getEventTypes() {
        return this.product.eventTypes;
    }

    comments() {
        this.router.navigate(['comments/' + this.product.id]);
    }

    chat() {
        this.chatService.createProductChat(this.product.id).subscribe({
            next: (data: number) => {
                this.router.navigate(['chat/']);
            },
            error: (err) => {
                console.error('Failed to open chat:', err);
                this.snackBar.open('Failed to open chat.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }
}
