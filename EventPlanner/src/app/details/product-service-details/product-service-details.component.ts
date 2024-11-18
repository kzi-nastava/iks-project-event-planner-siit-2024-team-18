import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service'; // Assuming this service handles product/service data

@Component({
  selector: 'app-product-service-details',
  templateUrl: './product-service-details.component.html',
  styleUrls: ['./product-service-details.component.css']
})
export class ProductServiceDetailsComponent implements OnInit {
  productId!: number;
  productServiceDetails: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.fetchProductServiceDetails(this.productId);
    } else {
      this.router.navigate(['']);
    }
  }

  fetchProductServiceDetails(productId: number): void {
    this.productServiceDetails = this.productService.getProductServiceById(productId);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
