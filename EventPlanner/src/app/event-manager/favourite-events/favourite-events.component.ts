import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-favourite-events',
  templateUrl: './favourite-events.component.html',
  styleUrl: './favourite-events.component.css'
})
export class FavouriteEventsComponent {
  events: Event[] = [];

  constructor(
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }
}
