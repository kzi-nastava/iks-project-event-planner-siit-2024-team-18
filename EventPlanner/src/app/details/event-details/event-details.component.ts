import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId!: number;
  eventDetails: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.fetchEventDetails(this.eventId);
    } else {
      this.router.navigate(['']);
    }
  }

  fetchEventDetails(eventId: number): void {
    this.eventDetails = this.eventService.getEventById(eventId);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
