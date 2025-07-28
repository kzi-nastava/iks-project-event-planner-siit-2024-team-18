import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { Grade } from '../models/grade.model';
import { PagedResponse } from '../shared/model/paged-response.model';

@Injectable({
    providedIn: 'root',
})
export class ProductManagerService {
    constructor(private router: Router, private httpClient: HttpClient) {}

    getProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(
            environment.apiHost + '/api/products/details/' + id
        );
    }

    getProductsByCreator(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(
            environment.apiHost + '/api/products/creator'
        );
    }

    openProductDetails(productId: number) {
        this.router.navigate(['/product/', productId]);
    }

    getProductGrade(productId: number): Observable<Grade> {
        return this.httpClient.get<Grade>(
            environment.apiHost + '/api/products/grade/' + productId
        );
    }

    getNumberOfReviews(productId: number): Observable<number> {
        return this.httpClient.get<number>(
            environment.apiHost + '/api/products/reviews/' + productId
        );
    }

    rateProduct(
        productId: number,
        value: number,
        comment: string
    ): Observable<void> {
        return this.httpClient.post<void>(
            environment.apiHost + '/api/products/grade/' + productId,
            { value: value, comment: comment }
        );
    }

    searchAndFilter(
        filters: any,
        page: number,
        pageSize: number
    ): Observable<PagedResponse<Product>> {
        let params = new HttpParams();

        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && filters[key] !== undefined) {
                params = params.set(key, filters[key]);
            }
        });

        params = params
            .set('page', page.toString())
            .set('size', pageSize.toString());

        return this.httpClient.get<PagedResponse<Product>>(
            `${environment.apiHost}/api/products/search`,
            { params }
        );
    }

    createProduct(product: FormData): Observable<void> {
        return this.httpClient.post<void>(
            environment.apiHost + '/api/products/create',
            product
        );
    }

    updateProduct(product: FormData, id: number): Observable<void> {
        return this.httpClient.put<void>(
            environment.apiHost + '/api/products/edit/' + id,
            product
        );
    }

    deleteProduct(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            environment.apiHost + '/api/products/delete/' + id
        );
    }
}
