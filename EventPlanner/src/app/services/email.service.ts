import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventInvitation } from '../models/event-invitation.model';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

  sendEventInvitations(eventId: number, emails: string[]): Observable<EventInvitation> {
    return this.httpClient.post<EventInvitation>(
      `${environment.apiHost}/api/emails/send-invitation/${eventId}`,
      emails
    );
  }
}