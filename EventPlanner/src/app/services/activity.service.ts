import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  delete(id: number): Observable<number> {
    return this.http.delete<number>(environment.apiHost + "/api/agenda/delete/" + id);
  }

  getAllByEventId(eventId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(environment.apiHost + '/api/agenda/' + eventId);
  }

  create(activity: Activity, eventId: number): Observable<Activity> {
    return this.http.post<Activity>(`${environment.apiHost}/api/agenda/create/${eventId}`, activity);
  }

  update(activity: Activity): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}/api/agenda/edit/${activity.id}`, activity);
  }
}
