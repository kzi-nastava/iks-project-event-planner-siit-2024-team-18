import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from './model/auth-response.model';
import { environment } from '../../env/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + '/login', auth, {
      headers: this.headers,
    });
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = this.isLocalStorageAvailable() ? localStorage.getItem('user') : null;
      if (accessToken) {
        const helper = new JwtHelperService();
        return helper.decodeToken(accessToken).role[0].authority;
      }
    }
    return null;
  }

  getUserInfo(): any {
    const accessToken: any = this.isLocalStorageAvailable() ? localStorage.getItem('user') : null;
    if (accessToken) {
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken);
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('user') != null;
    }
    return false;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
