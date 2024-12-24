import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UpdateUser } from '../models/update-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  eventOrganizerRegistration(user: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + '/api/event-organizers', user);
  }

  serviceProductProviderRegistration(user: User): Observable<User> {
    return this.http.post<User>(environment.apiHost + '/api/service-product-providers', user);
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(environment.apiHost + '/api/user-profiles');
  }

  deactivate(email: string): Observable<any> {
    return this.http.delete(environment.apiHost + '/api/user-profiles/deactivate/' + email);
  }

  update(user: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(environment.apiHost + '/api/user-profiles', user);
  }
}
