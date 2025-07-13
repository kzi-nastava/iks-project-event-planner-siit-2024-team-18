import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDetails } from '../../models/event-details.model';
import { AuthService } from '../../auth/auth.service';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BudgetService } from '../../services/budget.service';
import { BudgetItem } from '../../models/budget-item.model';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
    event!: EventDetails | null;
    isBlocked: boolean = false;
    currentIndex: number = 0;
    swiperOffset: number = 0;

    isJoined: boolean = false;
    isFavorite: boolean = false;

    loggedUserRole: string = '';
    loggedUserEmail: string = '';
    isLoggedIn: boolean = false;

    activities: Activity[] = [];
    budgetItems: BudgetItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private authService: AuthService,
        private activityService: ActivityService,
        private budgetService: BudgetService,
        private userService: UserService,
        private snackBar: MatSnackBar,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isLoggedIn();

        if (this.isLoggedIn) {
            this.loggedUserRole = this.authService.getRole();
            this.loggedUserEmail = this.authService.getUserInfo()['sub'];
        }

        this.route.params.subscribe((params) => {
            const id = +params['id'];
            if (!isNaN(id)) {
                this.fetchEventDetails(id);
                this.loadActivities(id);
                if (this.isLoggedIn) {
                    this.isEventInFavorites(id);
                    this.isJoinedToEvent(id);
                    this.loadBudgetItems(id);
                }
            } else {
                this.router.navigate(['']);
            }
        });
    }

    fetchEventDetails(eventId: number): void {
        this.eventService.getEventDetails(eventId).subscribe({
            next: (data: EventDetails | null) => {
                if (data) {
                    this.event = data;
                } else {
                    this.isBlocked = true;
                }
            },
            error: (err) => {
                console.error('Failed to fetch event details:', err);
                this.snackBar.open('Error fetching event details.', 'OK', {
                    duration: 3000,
                });
                this.router.navigate(['']);
            },
        });
    }

    loadActivities(eventId: number) {
        this.activityService.getAllByEventId(eventId).subscribe({
            next: (activities: Activity[]) => {
                this.activities = activities;
            },
            error: (err) => {
                console.error('Error fetching activities:', err);
                this.snackBar.open('Error fetching activities.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    isEventInFavorites(eventId: number) {
        this.userService.isEventInFavourites(eventId).subscribe({
            next: (isFavorite: boolean) => {
                this.isFavorite = isFavorite;
            },
            error: (err) => {
                console.error('Error fetching is favorite:', err);
                this.snackBar.open('Error fetching is favorite.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    isJoinedToEvent(eventId: number) {
        this.userService.isJoinedToEvent(eventId).subscribe({
            next: (isJoined: boolean) => {
                this.isJoined = isJoined;
            },
            error: (err) => {
                console.error('Error fetching is joined:', err);
                this.snackBar.open('Error fetching is joined.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    loadBudgetItems(eventId: number) {
        this.budgetService.getBudgetItems(eventId).subscribe({
            next: (budgetItems: BudgetItem[]) => {
                this.budgetItems = budgetItems;
            }
        });
    }

    prevImage(): void {
        if (this.event?.images) {
            this.currentIndex =
                this.currentIndex > 0
                    ? this.currentIndex - 1
                    : this.event.images.length - 1;
            this.updateSwiperPosition();
        }
    }

    nextImage(): void {
        if (this.event?.images) {
            this.currentIndex =
                this.currentIndex < this.event.images.length - 1
                    ? this.currentIndex + 1
                    : 0;
            this.updateSwiperPosition();
        }
    }

    goToImage(index: number): void {
        if (this.event?.images) {
            this.currentIndex = index;
            this.updateSwiperPosition();
        }
    }

    private updateSwiperPosition(): void {
        this.swiperOffset = -this.currentIndex * 100;
    }

    goBack(): void {
        this.location.back();
    }

    joinEvent(): void {
        this.userService.joinToEvent(this.event!.id).subscribe({
            next: () => {
                this.isJoined = true;
                this.snackBar.open('You have joined the event.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error joining the event:', err);
                let errorMessage = 'Error joining the event.';
                if (err.status === 400) {
                    errorMessage = 'There is no space available on this event.';
                }
                this.snackBar.open(errorMessage, 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    leaveEvent(): void {
        this.userService.leaveEvent(this.event!.id).subscribe({
            next: () => {
                this.isJoined = false;
                this.snackBar.open('You have left the event.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error leaving the event:', err);
                this.snackBar.open('Error leaving the event.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    addToFavorites(): void {
        this.userService.addEventToFavourites(this.event!.id).subscribe({
            next: () => {
                this.isFavorite = true;
                this.snackBar.open('Event added to favourites.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error adding event to favourites:', err);
                this.snackBar.open('Error adding event to favourites.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    removeFromFavorites(): void {
        this.userService.removeEventFromFavourites(this.event!.id).subscribe({
            next: () => {
                this.isFavorite = false;
                this.snackBar.open('Event removed from favourites.', 'OK', {
                    duration: 3000,
                });
            },
            error: (err) => {
                console.error('Error removing event from favourites:', err);
                this.snackBar.open(
                    'Error removing event from favourites.',
                    'OK',
                    {
                        duration: 3000,
                    }
                );
            },
        });
    }

    downloadReport(): void {
        this.eventService.downloadReport(this.event!.id).subscribe((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `event_${this.event!.id}_guests.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    isUpcoming(): boolean {
    return new Date(this.event!.startDate) > new Date();
}
}
