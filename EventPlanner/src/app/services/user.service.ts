import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';
import { UpdateUser } from '../models/update-user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    eventOrganizerRegistration(user: User): Observable<User> {
        return this.http.post<User>(
            environment.apiHost + '/api/event-organizers',
            user
        );
    }

    serviceProductProviderRegistration(user: User): Observable<User> {
        return this.http.post<User>(
            environment.apiHost + '/api/service-product-providers',
            user
        );
    }

    getLoggedUser(): Observable<User> {
        return this.http.get<User>(environment.apiHost + '/api/user-profiles');
    }

    getRecipient(chatId: number, loggedUserId: number): Observable<User> {
        return this.http.get<User>(
            environment.apiHost +
                `/api/user-profiles/recipient/${chatId}/${loggedUserId}`
        );
    }

    getOtherUser(otherUserId: number): Observable<User> {
        return this.http.get<User>(
            environment.apiHost + '/api/user-profiles/other-user/' + otherUserId
        );
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(
            environment.apiHost + '/api/user-profiles/all'
        );
    }

    deactivate(): Observable<any> {
        return this.http.delete(
            environment.apiHost + '/api/user-profiles/deactivate'
        );
    }

    update(user: UpdateUser): Observable<UpdateUser> {
        return this.http.put<UpdateUser>(
            environment.apiHost + '/api/user-profiles',
            user
        );
    }

    fastEventOrganizerRegistration(user: User): Observable<User> {
        return this.http.post<User>(
            environment.apiHost + '/api/event-organizers/fast-registration',
            user
        );
    }

    fastServiceProductProviderRegistration(user: User): Observable<User> {
        return this.http.post<User>(
            environment.apiHost +
                '/api/service-product-providers/fast-registration',
            user
        );
    }

    isEventInFavourites(eventId: number): Observable<boolean> {
        return this.http.get<boolean>(
            environment.apiHost +
                `/api/user-profiles/favourite-events/is-in/${eventId}`
        );
    }

    addEventToFavourites(eventId: number): Observable<any> {
        return this.http.put(
            environment.apiHost +
                `/api/user-profiles/favourite-events/add/${eventId}`,
            {}
        );
    }

    removeEventFromFavourites(eventId: number): Observable<any> {
        return this.http.put(
            environment.apiHost +
                `/api/user-profiles/favourite-events/remove/${eventId}`,
            {}
        );
    }

    isJoinedToEvent(eventId: number): Observable<boolean> {
        return this.http.get<boolean>(
            environment.apiHost +
                `/api/user-profiles/event-participation/is-joined/${eventId}`
        );
    }

    joinToEvent(eventId: number): Observable<any> {
        return this.http.post(
            environment.apiHost +
                `/api/user-profiles/event-participation/join/${eventId}`,
            {}
        );
    }

    leaveEvent(eventId: number): Observable<any> {
        return this.http.delete(
            environment.apiHost +
                `/api/user-profiles/event-participation/leave/${eventId}`,
            {}
        );
    }
}
