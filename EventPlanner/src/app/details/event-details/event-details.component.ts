import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventCard } from '../../models/event-card.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event!: EventCard;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.fetchEventDetails(id);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  fetchEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (data: EventCard) => {
        this.event = data;
      },
      error: (err) => {
        console.error('Failed to fetch event details:', err);
        this.router.navigate(['']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
