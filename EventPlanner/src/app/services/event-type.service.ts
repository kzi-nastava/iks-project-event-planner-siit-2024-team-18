import { Injectable } from '@angular/core';
import { EventType } from '../models/event-type.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<EventType[]> {
    return this.http.get<EventType[]>(environment.apiHost + '/api/event-types');
  }

  create(eventType: EventType): Observable<EventType> {
    return this.http.post<EventType>(environment.apiHost + '/api/event-types/create', eventType);
  }

  update(eventType: EventType, id: number): Observable<EventType> {
    return this.http.put<EventType>(environment.apiHost + '/api/event-types/edit/' + id, eventType);
  }
  
  delete(id: number) {
    return this.http.delete<void>(environment.apiHost + '/api/event-types/delete/' + id);
  }
}
