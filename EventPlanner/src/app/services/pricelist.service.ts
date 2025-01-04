import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class PricelistService {
  constructor(private http: HttpClient) {}

  updatePricelistItem(solution: Service | Product, id: number): Observable<void> {
    return this.http.put<void>(environment.apiHost + '/api/pricelist/edit/' + id, solution);
  }  

  createPdf(solutions: Service[] | Product[], url: string): Observable<Blob> {
    return this.http.post<Blob>(environment.apiHost + url, solutions, { responseType: 'blob' as 'json' });
  }
}
