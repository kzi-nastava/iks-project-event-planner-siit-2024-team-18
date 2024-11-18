import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-top-five-events',
  templateUrl: './top-five-events.component.html',
  styleUrls: ['./top-five-events.component.css']
})
export class TopFiveEventsComponent implements OnInit {
  events: Event[] = [];
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getTopFiveEvents().subscribe((data) => {
      this.events = data;
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

  openEventDetails(event: Event): void {
    this.eventService.openEventDetails(event.id);
  }
}
