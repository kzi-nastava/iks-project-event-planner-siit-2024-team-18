import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from '../models/product-service.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private topFiveProductsServices: ProductService[] = [
    { id: 1, title: 'Smartphone', description: 'Latest smartphone with cutting-edge features.', image: 'assets/product_service_placeholder.png', price: 699.99 },
    { id: 2, title: 'Laptop', description: 'Lightweight and powerful laptop for professionals.', image: 'assets/product_service_placeholder2.png', price: 1199.99 },
    { id: 3, title: 'Wireless Earbuds', description: 'Noise-cancelling earbuds with long battery life.', image: 'assets/product_service_placeholder3.png', price: 149.99 },
    { id: 4, title: 'Gaming Chair', description: 'Ergonomic chair designed for ultimate comfort.', image: 'assets/product_service_placeholder2.png', price: 249.99 },
    { id: 5, title: 'Smartwatch', description: 'Stylish smartwatch with fitness tracking.', image: 'assets/product_service_placeholder.png', price: 199.99 }
  ];

  private allProductsServices: ProductService[] = [
    { id: 1, title: 'Smartphone', description: 'Latest smartphone with cutting-edge features.', image: 'assets/product_service_placeholder.png', price: 699.99 },
    { id: 2, title: 'Laptop', description: 'Lightweight and powerful laptop for professionals.', image: 'assets/product_service_placeholder2.png', price: 1199.99 },
    { id: 3, title: 'Wireless Earbuds', description: 'Noise-cancelling earbuds with long battery life.', image: 'assets/product_service_placeholder3.png', price: 149.99 },
    { id: 4, title: 'Gaming Chair', description: 'Ergonomic chair designed for ultimate comfort.', image: 'assets/product_service_placeholder2.png', price: 249.99 },
    { id: 5, title: 'Smartwatch', description: 'Stylish smartwatch with fitness tracking.', image: 'assets/product_service_placeholder.png', price: 199.99 },
    { id: 6, title: 'Camera', description: 'High-resolution DSLR for professional photography.', image: 'assets/product_service_placeholder2.png', price: 899.99 },
    { id: 7, title: 'Tablet', description: 'Portable tablet for work and entertainment.', image: 'assets/product_service_placeholder3.png', price: 499.99 },
    { id: 8, title: 'Bluetooth Speaker', description: 'Portable speaker with crystal-clear sound.', image: 'assets/product_service_placeholder3.png', price: 79.99 },
    { id: 9, title: 'Gaming Mouse', description: 'High-precision mouse for gamers.', image: 'assets/product_service_placeholder.png', price: 59.99 },
    { id: 10, title: '4K Monitor', description: 'Ultra HD monitor for crisp and vibrant visuals.', image: 'assets/product_service_placeholder4.png', price: 399.99 },
  ];

  constructor(private router : Router) {}

  getTopFiveProductsServices(): Observable<ProductService[]> {
    return of(this.topFiveProductsServices);
  }

  getAllProductsServices(): Observable<ProductService[]> {
    return of(this.allProductsServices);
  }

  openProductServiceDetails(productServiceId: number) {
    if(productServiceId){
      this.router.navigate(['/product-service-details', productServiceId]);
    } else {
      console.log('Invalid productService Id: ', productServiceId);
    }
  }

  getProductServiceById(id: number): any {
    return this.allProductsServices.find(ps => ps.id === id) || null;
  }
}
