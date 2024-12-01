import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private topFiveEvents: Event[] = [
    { id: 1, title: 'City Food Festival', description: 'Explore the best local food vendors.', image: 'assets/event_placeholder.png', date: new Date('2024-11-20'), location: 'Downtown' },
    { id: 2, title: 'Music Night', description: 'Live music from local artists.', image: 'assets/event_placeholder2.png', date: new Date('2024-11-25'), location: 'City Park' },
    { id: 3, title: 'Art Exhibition', description: 'Display of artwork from renowned artists.', image: 'assets/event_placeholder.png', date: new Date('2024-12-01'), location: 'Art Gallery' },
    { id: 4, title: 'Winter Market', description: 'Seasonal market with crafts and goods.', image: 'assets/event_placeholder3.png', date: new Date('2024-12-10'), location: 'Main Square' },
    { id: 5, title: 'Outdoor Movie Night', description: 'Enjoy classic films under the stars.', image: 'assets/event_placeholder3.png', date: new Date('2024-12-15'), location: 'Open Air Theatre' }
  ];

  private allEvents: Event[] = [
    { id: 1, title: 'City Food Festival', description: 'Explore the best local food vendors.', image: 'assets/event_placeholder.png', date: new Date('2024-11-20'), location: 'Downtown' },
    { id: 2, title: 'Music Night', description: 'Live music from local artists.', image: 'assets/event_placeholder2.png', date: new Date('2024-11-25'), location: 'City Park' },
    { id: 3, title: 'Art Exhibition', description: 'Display of artwork from renowned artists.', image: 'assets/event_placeholder.png', date: new Date('2024-12-01'), location: 'Art Gallery' },
    { id: 4, title: 'Winter Market', description: 'Seasonal market with crafts and goods.', image: 'assets/event_placeholder3.png', date: new Date('2024-12-10'), location: 'Main Square' },
    { id: 5, title: 'Outdoor Movie Night', description: 'Enjoy classic films under the stars.', image: 'assets/event_placeholder3.png', date: new Date('2024-12-15'), location: 'Open Air Theatre' },
    { id: 6, title: 'Charity Run', description: 'Join us for a 5K run for charity.', image: 'assets/event_placeholder4.png', date: new Date('2024-11-18'), location: 'Central Park' },
    { id: 7, title: 'Science Fair', description: 'Showcase of science projects.', image: 'assets/event_placeholder.png', date: new Date('2024-11-22'), location: 'Community Hall' },
    { id: 8, title: 'Book Signing', description: 'Meet your favorite authors.', image: 'assets/event_placeholder4.png', date: new Date('2024-11-26'), location: 'Bookstore' },
    { id: 9, title: 'Comedy Night', description: 'Stand-up comedy from local talent.', image: 'assets/event_placeholder.png', date: new Date('2024-11-28'), location: 'Comedy Club' },
    { id: 10, title: 'Tech Expo', description: 'Latest in technology and innovation.', image: 'assets/event_placeholder.png', date: new Date('2024-12-05'), location: 'Convention Center' }
  ];

  private invitedEventIds: number[] = [1, 3, 5, 7, 9, 10];

  constructor(private router: Router) {}

  getTopFiveEvents(): Observable<Event[]> {
    return of(this.topFiveEvents);
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

  getEventById(eventId: number): Event | undefined {
    return this.allEvents.find(event => event.id === eventId);
  }
}
