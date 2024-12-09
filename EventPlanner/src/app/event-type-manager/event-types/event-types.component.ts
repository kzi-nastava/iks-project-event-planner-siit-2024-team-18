import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EventType } from '../../models/event-type.model';
import { EventTypeService } from '../../services/event-type.service';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { CreateEventTypeComponent } from '../create-event-type/create-event-type.component';
import { EditEventTypeComponent } from '../edit-event-type/edit-event-type.component';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrl: './event-types.component.css'
})
export class EventTypesComponent {
  eventTypes: EventType[] = [];

  constructor(
    private eventTypeService: EventTypeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.loadEventTypes();
  }

  loadEventTypes() {
    this.eventTypeService.getAll().subscribe({
      next: (data: EventType[]) => {
        this.eventTypes = data;
      },
      error: (err) => {
        console.error('Error fetching event types:', err);
        this.snackBar.open('Failed to load event types. Please try again later.', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateEventTypeComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((newEventType: EventType) => {
      if (newEventType) {
        this.eventTypeService.create(newEventType).subscribe({
          next: () => {
            this.loadEventTypes();
            this.snackBar.open('Event Type successfully created!', 'OK', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log(err.status)
            console.log(err.error)
            if (err.status === 400) {
              this.snackBar.open('An Event Type with the same name already exists. Please choose a different name.', 'OK', {
                duration: 3000,
              });
            } else {
              console.error('Error creating event type:', err);
              this.snackBar.open('An unexpected error occurred while creating the Event Type.', 'OK', {
                duration: 3000,
              });
            }
          },
        });
      }
    });
  }

  openEditModal(eventType: EventType) {
    const dialogRef = this.dialog.open(EditEventTypeComponent, {
      width: '500px',
      data: { eventType },
    });

    dialogRef.afterClosed().subscribe((updatedEventType: EventType) => {
      if (updatedEventType) {
        this.eventTypeService.update(updatedEventType, updatedEventType.id).subscribe({
          next: () => {
            this.loadEventTypes();
            this.snackBar.open('Event Type successfully updated!', 'OK', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Error updating event type:', err);
            this.snackBar.open('An error occurred while updating the Event Type.', 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  deactivate(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '27em',
      data: { message: 'Are you sure you want to deactivate this event type?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventTypeService.delete(id).subscribe({
          next: () => {
            this.loadEventTypes();
            this.snackBar.open('Event Type successfully deactivated!', 'OK', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Error deactivating event type:', err);
            this.snackBar.open('An error occurred while deactivating the Event Type.', 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
