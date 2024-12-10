import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventCard } from '../../../models/event-card.model';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrls: ['./top-five-events.component.css']
})
export class TopFiveEventsComponent implements OnInit {
  events: EventCard[] = [];
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getTopFiveEvents("Paris").subscribe({
      next: (result: EventCard[]) => {
        this.events = result;
      },
      error: (err) => {
        console.error('Failed to fetch top events:', err);
      }
    });
  }

  prevEvent(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.events.length - 1;
    }
    this.updateSwiperPosition();
  }

  nextEvent(): void {
    if (this.currentIndex < this.events.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSwiperPosition();
  }

  goToEvent(index: number): void {
    this.currentIndex = index;
    this.updateSwiperPosition();
  }

  private updateSwiperPosition(): void {
    this.swiperOffset = -this.currentIndex * 100;
  }

  openEventDetails(event: EventCard): void {
    this.eventService.openEventDetails(event.id);
  }
}
