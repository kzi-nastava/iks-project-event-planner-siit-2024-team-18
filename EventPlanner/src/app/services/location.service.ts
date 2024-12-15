import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getAutocompleteLocations(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${environment.apiHost}/api/locations/autocomplete`, { params });
  }

  getLocationDetails(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${environment.apiHost}/api/locations/details`, { params });
  }
}
