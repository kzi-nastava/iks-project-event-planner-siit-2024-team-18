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

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(environment.apiHost + "/api/products/details/" + id);
  }

  openProductDetails(productId: number) {
    this.router.navigate(['/product/', productId]);
  }
}
