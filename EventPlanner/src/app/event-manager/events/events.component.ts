import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventCard } from '../../models/event-card.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: EventCard[] = [];

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllByCreator().subscribe({
      next: (data: EventCard[]) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching creator events:', err);
        this.snackBar.open('Failed to load creator events. Please try again later.', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  delete(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '27em',
      data: { message: 'Are you sure you want to delete this event?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.delete(id).subscribe({
          next: () => {
            this.loadEvents();
            this.snackBar.open('Event successfully deleted!', 'OK', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Error deleting event:', err);
            this.snackBar.open('An error occurred while deleting the Event.', 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
