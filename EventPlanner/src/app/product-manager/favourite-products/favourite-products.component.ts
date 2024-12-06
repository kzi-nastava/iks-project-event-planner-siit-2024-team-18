import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductManagerService } from '../../services/product-manager.service';

@Component({
  selector: 'app-favourite-products',
  templateUrl: './favourite-products.component.html',
  styleUrl: './favourite-products.component.css'
})
export class FavouriteProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductManagerService,
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
