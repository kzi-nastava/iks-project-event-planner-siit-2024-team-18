import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  constructor(private http: HttpClient) { }

  activateAccount(id: number): Observable<any> {
      return this.http.get(
        `${environment.apiHost}/api/registration-requests/accept?id=${id}`
      );
    }
}
