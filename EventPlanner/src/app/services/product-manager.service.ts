import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {
  constructor(private router : Router,
              private httpClient: HttpClient) {}
  private products: Product[] = [
    { id: 1, name: 'Smartphone', description: 'Latest smartphone with cutting-edge features.', image: 'assets/product_service_placeholder.png' },
    { id: 2, name: 'Laptop', description: 'Lightweight and powerful laptop for professionals.', image: 'assets/product_service_placeholder2.png' },
    { id: 3, name: 'Wireless Earbuds', description: 'Noise-cancelling earbuds with long battery life.', image: 'assets/product_service_placeholder3.png' },
    { id: 4, name: 'Gaming Chair', description: 'Ergonomic chair designed for ultimate comfort.', image: 'assets/product_service_placeholder2.png' },
    { id: 5, name: 'Smartwatch', description: 'Stylish smartwatch with fitness tracking.', image: 'assets/product_service_placeholder.png' },
    { id: 6, name: 'Camera', description: 'High-resolution DSLR for professional photography.', image: 'assets/product_service_placeholder2.png' },
    { id: 7, name: 'Tablet', description: 'Portable tablet for work and entertainment.', image: 'assets/product_service_placeholder3.png' },
    { id: 8, name: 'Bluetooth Speaker', description: 'Portable speaker with crystal-clear sound.', image: 'assets/product_service_placeholder3.png' },
    { id: 9, name: 'Gaming Mouse', description: 'High-precision mouse for gamers.', image: 'assets/product_service_placeholder.png' },
    { id: 10, name: '4K Monitor', description: 'Ultra HD monitor for crisp and vibrant visuals.', image: 'assets/product_service_placeholder4.png' },
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(environment.apiHost + "/api/products/details/" + id);
  }

  getTopFiveProducts(): Observable<Product[]> {
    return of(this.products.slice(0, 5));
  }

  openProductDetails(productId: number) {
    if(productId){
      this.router.navigate(['/product/', productId]);
    } else {
      console.log('Invalid product Id: ', productId);
    }
  }
}
