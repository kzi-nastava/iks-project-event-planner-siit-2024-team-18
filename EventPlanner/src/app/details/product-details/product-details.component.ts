import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagerService } from '../../services/product-manager.service';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseProductDialogComponent } from '../purchase-product-dialog/purchase-product-dialog.component';
import { BudgetService } from './../../services/budget.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;
  isBlocked: boolean = false;
  currentImageIndex: number = 0; 
  isFavorite: boolean = false; 
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductManagerService,
    private budgetService: BudgetService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

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
        data: { productName: this.product.name }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.budgetService.buyProduct(this.product, result).subscribe({
            error: (err) => {
              console.error('Failed to purchase product. Budget item limit has been reached:', err);
              this.snackBar.open('Failed to purchase product. Budget item limit has been reached.', 'OK', {
                duration: 3000,
              });
            },
          })
        }
      });
    }
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
      }
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  getEventTypes() {
    return this.product.eventTypes;
  }
}
