import { Component } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventService.getAllCards().subscribe((data: EventCard[]) => {
      this.events = data;
    });
  }

  edit(event: MouseEvent, id: number): void {
    event.stopPropagation();
    this.router.navigate(['/events/edit', id]);
  }

  delete(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '27em',
      data: { message: 'Are you sure you want to delete this event?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.delete(id);
      }
    });
  }
}
