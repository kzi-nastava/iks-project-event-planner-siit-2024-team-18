import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiHost + '/api/categories');
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<string>(environment.apiHost + '/api/categories/create', category);
  }

  updateCategory(category: any, id: number): Observable<any> {
    return this.http.put<string>(environment.apiHost + '/api/categories/edit/' + id, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + '/api/categories/delete/' + id);
  }
}
