import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  createReservation(data: {
    serviceId: number;
    eventId: number;
    date: string;
    timeFrom: string;
    timeTo: string;
  }): Observable<Reservation> {
    return this.httpClient.post<Reservation>(
      `${environment.apiHost}/api/reservations`,
      data
    );
  }

  getReservationsByServiceId(serviceId: number): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + "/api/reservations/" + serviceId);
  }
}
