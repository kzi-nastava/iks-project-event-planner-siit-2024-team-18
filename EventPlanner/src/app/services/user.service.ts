import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  eventOrganizerRegistration(user: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + '/api/event-organizers', user);
  }

  serviceProductProviderRegistration(user: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + '/api/service-product-providers', user);
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(environment.apiHost + '/api/user-profiles');
  }

  delete(id: number) {
    
  }
}
