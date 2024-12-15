import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolutionCard } from '../models/solution-card.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private router: Router, private httpClient: HttpClient) {}

  getTopFiveSolutions(): Observable<SolutionCard[]> {
    return this.httpClient.get<SolutionCard[]>(environment.apiHost + '/api/solutions/top-solutions');
  }

  getSolutions(eventId: number): Observable<SolutionCard[]> {
    return this.httpClient.get<SolutionCard[]>(environment.apiHost + '/api/budget/details/' + eventId);
  }

  isProduct(solutionId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apiHost + '/api/solutions/isProduct/' + solutionId);
  }

  getAllSolutions(
    filters?: {
      keyword?: string;
      city?: string;
      isProductOnly?: boolean;
      startDate?: string;
      endDate?: string;
      name?: string;
      description?: string;
      price?: number;
      discount?: number;
      categoryName?: string;
      providerFirstName?: string;
      country?: string;
      sortBy?: string;
      sortDirection?: 'ASC' | 'DESC';
      page?: number;
      pageSize?: number;
    }
  ): Observable<PagedResponse<SolutionCard>> {
    let params = new HttpParams();
  
    if (filters?.keyword) {
      params = params.set('keyword', filters.keyword);
    }
    if (filters?.city) {
      params = params.set('city', filters.city);
    }
    if (filters?.isProductOnly !== undefined) {
      params = params.set('isProductOnly', filters.isProductOnly.toString());
    }
    if (filters?.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    if (filters?.name) {
      params = params.set('name', filters.name);
    }
    if (filters?.description) {
      params = params.set('description', filters.description);
    }
    if (filters?.price !== undefined) {
      params = params.set('price', filters.price.toString());
    }
    if (filters?.discount !== undefined) {
      params = params.set('discount', filters.discount.toString());
    }
    if (filters?.categoryName) {
      params = params.set('categoryName', filters.categoryName);
    }
    if (filters?.providerFirstName) {
      params = params.set('providerFirstName', filters.providerFirstName);
    }
    if (filters?.country) {
      params = params.set('country', filters.country);
    }
    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters?.sortDirection) {
      params = params.set('sortDirection', filters.sortDirection);
    }
    if (filters?.page !== undefined) {
      params = params.set('page', filters.page.toString());
    }
    if (filters?.pageSize !== undefined) {
      params = params.set('size', filters.pageSize.toString());
    }
  
    return this.httpClient.get<PagedResponse<SolutionCard>>(
      `${environment.apiHost}/api/solutions`, 
      { params }
    );
  }

  openSolutionDetails(solution: SolutionCard): void {
    if (solution.solutionType === "PRODUCT") {
      this.router.navigate(['/product/', solution.id]);
    } else {
      this.router.navigate(['/service/', solution.id]);
    }
  }

  getSolutionById(solutionId: number): Observable<SolutionCard> {
    return this.httpClient.get<SolutionCard>(environment.apiHost + "/api/solutions/" + solutionId)
  }
}
