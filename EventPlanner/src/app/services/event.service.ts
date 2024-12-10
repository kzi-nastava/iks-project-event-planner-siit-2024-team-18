import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { EventCard } from '../models/event-card.model';
import { PagedResponse } from '../shared/model/paged-response.model';
import { CreateEvent } from '../models/create-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private allEvents: Event[] = [
    {
      _id: 1,
      eventType: 'Wedding',
      name: 'John and Jane\'s Wedding',
      description: 'A beautiful outdoor wedding ceremony.',
      maxParticipants: 100,
      privacyType: 'Public',
      location: 'Central Park, NYC',
      date: new Date('2024-12-20'),
      time: '16:00',
      images: ['https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg', 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg']
    },
    {
      _id: 2,
      eventType: 'Conference',
      name: 'Tech Conference 2024',
      description: 'Annual technology conference for developers and entrepreneurs.',
      maxParticipants: 500,
      privacyType: 'Private',
      location: 'Tech Hub Center, SF',
      date: new Date('2024-12-15'),
      time: '09:00',
      images: ['https://static.vecteezy.com/system/resources/thumbnails/009/273/280/small/concept-of-loneliness-and-disappointment-in-love-sad-man-sitting-element-of-the-picture-is-decorated-by-nasa-free-photo.jpg', 'https://tinypng.com/images/social/website.jpg']
    }
  ];

  private events: CreateEvent[] = [
    {
      _id: 1,
      eventType: 'Wedding',
      name: 'John and Jane\'s Wedding',
      description: 'A beautiful outdoor wedding ceremony.',
      maxParticipants: 100,
      privacyType: 'Public',
      location: 'Central Park, NYC',
      date: new Date('2024-12-20'),
      time: '16:00',
      images: ['https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg', 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg']
    },
    {
      _id: 2,
      eventType: 'Conference',
      name: 'Tech Conference 2024',
      description: 'Annual technology conference for developers and entrepreneurs.',
      maxParticipants: 500,
      privacyType: 'Private',
      location: 'Tech Hub Center, SF',
      date: new Date('2024-12-15'),
      time: '09:00',
      images: ['https://static.vecteezy.com/system/resources/thumbnails/009/273/280/small/concept-of-loneliness-and-disappointment-in-love-sad-man-sitting-element-of-the-picture-is-decorated-by-nasa-free-photo.jpg', 'https://tinypng.com/images/social/website.jpg']
    }
  ];

  private invitedEventIds: number[] = [1, 3, 5, 7, 9, 10];

  constructor(private router: Router, private httpClient: HttpClient) {}

  getTopFiveEvents(city: string): Observable<EventCard[]> {
    let params = new HttpParams().set('city', city);
    return this.httpClient.get<EventCard[]>(environment.apiHost + '/api/events/top-events', { params });
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

  getInvitedEvents(): Observable<Event[]> {
    const invitedEvents = this.allEvents.filter(event => this.invitedEventIds.includes(event._id));
    return of(invitedEvents);
  }

  openEventDetails(eventId: number): void {
    if (eventId) {
      this.router.navigate(['/event/', eventId]);
    } else {
      console.error('Invalid event ID:', eventId);
    }
  }

  getEventById(eventId: number): Observable<Event> {
    return this.httpClient.get<Event>(environment.apiHost + "/api/events/" + eventId)
  }

  getById(id: number): Observable<CreateEvent | undefined> {
    const event = this.events.find(event => event._id === id);
    return of(event);
  }

  delete(id: number) {

  }
}
