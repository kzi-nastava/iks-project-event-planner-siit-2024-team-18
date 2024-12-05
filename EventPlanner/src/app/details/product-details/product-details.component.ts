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
  product!: Product;  // Use Product model

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
}
