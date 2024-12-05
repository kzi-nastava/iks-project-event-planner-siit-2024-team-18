import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductManagerService } from '../../services/product-manager.service';

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.fetchProductDetails(this.productId);
    } else {
      this.router.navigate(['']);
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
    this.product = this.productService.getProductById(productId);

    if (!this.product || !this.product.isVisible) {
      this.router.navigate(['']);
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
