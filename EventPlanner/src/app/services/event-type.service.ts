import { Injectable } from '@angular/core';
import { EventType } from '../models/event-type.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  constructor() { }

  private eventTypes: EventType[] = [
    {
      _id: 1,
      name: 'Wedding',
      description: 'Events for wedding ceremonies.',
      categories: ['Photography', 'Catering']
    },
    {
      _id: 2,
      name: 'Concert',
      description: 'Music and entertainment events.',
      categories: ['Sound System', 'Venue', 'Lightning']
    },
    {
      _id: 3,
      name: 'Conference',
      description: 'Corporate and business conferences.',
      categories: ['Catering', 'Venue']
    }
  ]

  getAll(): Observable<EventType[]> {
    return of(this.eventTypes);
  }
  
  delete(id: number) {

  }

  getById(id: number): Observable<EventType | undefined> {
    const eventType = this.eventTypes.find((eventType) => eventType._id === id);
    console.log('uslo')
    return of(eventType);
  }
}
