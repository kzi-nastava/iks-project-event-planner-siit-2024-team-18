import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagerService {
  constructor(private router : Router, private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(environment.apiHost + '/api/services');
  }

  searchAndFilter(filters: any, page: number, pageSize: number): Observable<PagedResponse<Service>> {
    let params = new HttpParams();
  
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  
    params = params.set('page', page.toString()).set('size', pageSize.toString());
  
    return this.http.get<PagedResponse<Service>>(`${environment.apiHost}/api/services/search`, { params });
  }
  
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(environment.apiHost + "/api/services/details/" + id);
  }

  createService(service: any): Observable<any> {
    return this.http.post<string>(environment.apiHost + '/api/services/create', service);
  }

  updateService(service: any, id: number): Observable<any> {
    return this.http.put<string>(environment.apiHost + '/api/services/edit/' + id, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + '/api/services/delete/' + id);
  }
  
  openServiceDetails(serviceId: number) {
    this.router.navigate(['/service/', serviceId]);
  }
}
