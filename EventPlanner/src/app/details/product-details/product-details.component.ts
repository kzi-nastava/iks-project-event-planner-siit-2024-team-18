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
  product!: Product | null;

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

  fetchProductDetails(productId: number): void {
    this.product = this.productService.getProductById(productId);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
