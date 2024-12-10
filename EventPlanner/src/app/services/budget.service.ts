import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { BudgetItem } from '../models/budget-item.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  deleteBudgetItem(id: number): Observable<number> {
    return this.http.delete<number>(environment.apiHost + "/api/budget/delete/" + id);
  }

  getBudgetItems(): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(environment.apiHost + '/api/budget');
  }

  calculateTotalBudget(eventId: number): Observable<number> {
    return this.http.get<number>(`${environment.apiHost}/api/budget/total/${eventId}`);
  }

  createBudgetItem(budgetItem: BudgetItem, eventId: number): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(`${environment.apiHost}/api/budget/create/${eventId}`, budgetItem);
  }

  updateBudgetItem(item: BudgetItem): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}/api/budget/edit/${item.id}`, item);
  }
}
