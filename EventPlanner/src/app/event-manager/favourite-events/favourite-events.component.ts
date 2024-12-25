import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventCard } from '../../models/event-card.model';

@Component({
  selector: 'app-favourite-events',
  templateUrl: './favourite-events.component.html',
  styleUrl: './favourite-events.component.css'
})
export class FavouriteEventsComponent {
  events: EventCard[] = [];

  constructor(
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.eventService.getFavouriteEvents().subscribe((data: EventCard[]) => {
      this.events = data;
      console.log(data);
    });
  }
}
