import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { PagedResponse } from '../shared/model/paged-response.model';
import { Grade } from '../models/grade.model';

@Injectable({
    providedIn: 'root',
})
export class ServiceManagerService {
    constructor(private router: Router, private http: HttpClient) {}

    getServices(): Observable<Service[]> {
        return this.http.get<Service[]>(environment.apiHost + '/api/services');
    }

    getServicesByCreator(): Observable<Service[]> {
        return this.http.get<Service[]>(
            environment.apiHost + '/api/services/creator'
        );
    }

    searchAndFilter(
        filters: any,
        page: number,
        pageSize: number
    ): Observable<PagedResponse<Service>> {
        let params = new HttpParams();

        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && filters[key] !== undefined) {
                params = params.set(key, filters[key]);
            }
        });

        params = params
            .set('page', page.toString())
            .set('size', pageSize.toString());

        return this.http.get<PagedResponse<Service>>(
            `${environment.apiHost}/api/services/search`,
            { params }
        );
    }

    getServiceById(id: number): Observable<Service> {
        return this.http.get<Service>(
            environment.apiHost + '/api/services/details/' + id
        );
    }

    createService(service: FormData): Observable<void> {
        return this.http.post<void>(
            environment.apiHost + '/api/services/create',
            service
        );
    }

    updateService(service: FormData, id: number): Observable<void> {
        return this.http.put<void>(
            environment.apiHost + '/api/services/edit/' + id,
            service
        );
    }

    deleteService(id: number): Observable<void> {
        return this.http.delete<void>(
            environment.apiHost + '/api/services/delete/' + id
        );
    }

    openServiceDetails(serviceId: number) {
        this.router.navigate(['/service/', serviceId]);
    }

    getServiceGrade(serviceId: number): Observable<Grade> {
        return this.http.get<Grade>(
            environment.apiHost + '/api/services/grade/' + serviceId
        );
    }

    getNumberOfReviews(serviceId: number): Observable<number> {
        return this.http.get<number>(
            environment.apiHost + '/api/services/reviews/' + serviceId
        );
    }

    rateService(
        serviceId: number,
        value: number,
        comment: string
    ): Observable<void> {
        return this.http.post<void>(
            environment.apiHost + '/api/services/grade/' + serviceId,
            { value: value, comment: comment }
        );
    }
}
