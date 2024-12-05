import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagerService } from '../../services/product-manager.service';
import { Product } from '../../models/product.model';  // Use Product model

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: Product | null = null;
  currentImageIndex: number = 0; 
  isFavorite: boolean = false; 
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductManagerService,
    private router: Router
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
      next: (data: Product) => {
        this.product = data;
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
}
