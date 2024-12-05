import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../env/environment';
import { EventCard } from '../models/event-card.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private allEvents: Event[] = [
    { id: 1, name: 'City Food Festival', description: 'Explore the best local food vendors.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 2, name: 'Music Night', description: 'Live music from local artists.', locationName: 'Paris', cardImage: 'assets/event_placeholder2.png' },
    { id: 3, name: 'Art Exhibition', description: 'Display of artwork from renowned artists.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 4, name: 'Winter Market', description: 'Seasonal market with crafts and goods.', locationName: 'Paris', cardImage: 'assets/event_placeholder3.png' },
    { id: 5, name: 'Outdoor Movie Night', description: 'Enjoy classic films under the stars.', locationName: 'Paris', cardImage: 'assets/event_placeholder3.png' },
    { id: 6, name: 'Charity Run', description: 'Join us for a 5K run for charity.', locationName: 'Paris', cardImage: 'assets/event_placeholder4.png' },
    { id: 7, name: 'Science Fair', description: 'Showcase of science projects.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 8, name: 'Book Signing', description: 'Meet your favorite authors.', locationName: 'Paris', cardImage: 'assets/event_placeholder4.png' },
    { id: 9, name: 'Comedy Night', description: 'Stand-up comedy from local talent.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 10, name: 'Tech Expo', description: 'Latest in technology and innovation.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 11, name: 'Comedy Night', description: 'Stand-up comedy from local talent.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' },
    { id: 12, name: 'Tech Expo', description: 'Latest in technology and innovation.', locationName: 'Paris', cardImage: 'assets/event_placeholder.png' }
  ];

  private invitedEventIds: number[] = [1, 3, 5, 7, 9, 10];

  constructor(private router: Router, private httpClient: HttpClient) {}

  getTopFiveEvents(city: string): Observable<EventCard[]> {
    let params = new HttpParams().set('city', city);
    return this.httpClient.get<EventCard[]>(environment.apiHost + '/api/events/top-events', { params });
  }

  getAllEvents(): Observable<Event[]> {
    return of(this.allEvents);
  }

  getInvitedEvents(): Observable<Event[]> {
    const invitedEvents = this.allEvents.filter(event => this.invitedEventIds.includes(event.id));
    return of(invitedEvents);
  }

  openEventDetails(eventId: number): void {
    if (eventId) {
      this.router.navigate(['/event-details', eventId]);
    } else {
      console.error('Invalid event ID:', eventId);
    }
  }

  getEventById(eventId: number): Observable<EventCard> {
    return this.httpClient.get<EventCard>(environment.apiHost + "/api/events/" + eventId)
  }
}
