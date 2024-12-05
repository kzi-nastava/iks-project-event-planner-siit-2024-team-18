import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';
import { CreateEvent } from '../models/create-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private topFiveEvents: Event[] = [
    { id: 1, title: 'City Food Festival', description: 'Explore the best local food vendors.', image: 'assets/event_placeholder.png' },
    { id: 2, title: 'Music Night', description: 'Live music from local artists.', image: 'assets/event_placeholder2.png' },
    { id: 3, title: 'Art Exhibition', description: 'Display of artwork from renowned artists.', image: 'assets/event_placeholder.png' },
    { id: 4, title: 'Winter Market', description: 'Seasonal market with crafts and goods.', image: 'assets/event_placeholder3.png' },
    { id: 5, title: 'Outdoor Movie Night', description: 'Enjoy classic films under the stars.', image: 'assets/event_placeholder3.png' }
  ];

  private allEvents: Event[] = [
    { id: 1, title: 'City Food Festival', description: 'Explore the best local food vendors.', image: 'assets/event_placeholder.png' },
    { id: 2, title: 'Music Night', description: 'Live music from local artists.', image: 'assets/event_placeholder2.png' },
    { id: 3, title: 'Art Exhibition', description: 'Display of artwork from renowned artists.', image: 'assets/event_placeholder.png' },
    { id: 4, title: 'Winter Market', description: 'Seasonal market with crafts and goods.', image: 'assets/event_placeholder3.png' },
    { id: 5, title: 'Outdoor Movie Night', description: 'Enjoy classic films under the stars.', image: 'assets/event_placeholder3.png' },
    { id: 6, title: 'Charity Run', description: 'Join us for a 5K run for charity.', image: 'assets/event_placeholder4.png' },
    { id: 7, title: 'Science Fair', description: 'Showcase of science projects.', image: 'assets/event_placeholder.png' },
    { id: 8, title: 'Book Signing', description: 'Meet your favorite authors.', image: 'assets/event_placeholder4.png' },
    { id: 9, title: 'Comedy Night', description: 'Stand-up comedy from local talent.', image: 'assets/event_placeholder.png' },
    { id: 10, title: 'Tech Expo', description: 'Latest in technology and innovation.', image: 'assets/event_placeholder.png' }
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

  getById(id: number): Observable<CreateEvent | undefined> {
    const event = this.events.find(event => event._id === id);
    return of(event);
  }

  delete(id: number) {

  }
}
