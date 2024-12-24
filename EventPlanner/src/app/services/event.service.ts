import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { EventCard } from '../models/event-card.model';
import { PagedResponse } from '../shared/model/paged-response.model';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCards: EventCard[] = [];

  constructor(private router: Router, private httpClient: HttpClient) {}

  getTopFiveEvents(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(environment.apiHost + '/api/events/top-events');
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiHost + '/api/events/events-all');
  }

  getAllEvents(
    filters?: {
      keyword?: string;
      city?: string;
      startDate?: string;
      endDate?: string;
      country?: string;
      maxParticipants?: number;
      budget?: number;
      eventType?: string;
      organizerFirstName?: string;
      sortBy?: string;
      sortDirection?: 'ASC' | 'DESC';
      page?: number;
      pageSize?: number;
    }
  ): Observable<PagedResponse<EventCard>> {
    let params = new HttpParams();
  
    if (filters?.keyword) {
      params = params.set('keyword', filters.keyword);
    }
    if (filters?.city) {
      params = params.set('city', filters.city);
    }
    if (filters?.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    if (filters?.country) {
      params = params.set('country', filters.country);
    }
    if (filters?.maxParticipants) {
      params = params.set('maxParticipants', filters.maxParticipants.toString());
    }
    if (filters?.budget) {
      params = params.set('budget', filters.budget.toString());
    }
    if (filters?.eventType) {
      params = params.set('eventType', filters.eventType);
    }
    if (filters?.organizerFirstName) {
      params = params.set('organizerFirstName', filters.organizerFirstName);
    }
    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters?.sortDirection) {
      params = params.set('sortDirection', filters.sortDirection);
    }
    if (filters?.page !== undefined) {
      params = params.set('page', filters.page.toString());
    }
    if (filters?.pageSize !== undefined) {
      params = params.set('size', filters.pageSize.toString());
    }
    return this.httpClient.get<PagedResponse<EventCard>>(`${environment.apiHost}/api/events`, { params });
  }

  getAllCards(): Observable<EventCard[]>{
    return of(this.eventCards);
  }

  getAllByCreator(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(environment.apiHost + '/api/events/event-organizer');
  }

  openEventDetails(eventId: number): void {
    if (eventId) {
      this.router.navigate(['/event/', eventId]);
    } else {
      console.error('Invalid event ID:', eventId);
    }
  }

  getEventById(eventId: number): Observable<Event> {
    return this.httpClient.get<Event>(environment.apiHost + "/api/events/" + eventId);
  }

  getEventsByOrganizerId(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(`${environment.apiHost}/api/events/events-all`);
  }

  create(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(environment.apiHost + '/api/events/create', event);
  }

  update(event: Event, id: number): Observable<Event> {
    return this.httpClient.put<Event>(environment.apiHost + '/api/events/edit/' + id, event);
  }

  getEventForUpdate(id: number): Observable<Event> {
    return this.httpClient.get<Event>(environment.apiHost + '/api/events/edit/' + id);
  }

  getFavouriteEvents(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(environment.apiHost + '/api/user-profiles/favourite-events');
  }

  getAcceptedEvents(): Observable<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(environment.apiHost + '/api/user-profiles/accepted-events');
  }

  delete(id: number) {
    return this.httpClient.delete<void>(environment.apiHost + '/api/events/delete/' + id);
  }
}
