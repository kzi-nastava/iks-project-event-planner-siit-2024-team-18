import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { UpdatedInvite } from '../models/updated-invite.model';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(private httpClient: HttpClient) {}

  acceptInvite(inviteId: number): Observable<UpdatedInvite> {
    return this.httpClient.get<UpdatedInvite>(
      `${environment.apiHost}/api/invites/accept?inviteId=${inviteId}`
    );
  }
}
