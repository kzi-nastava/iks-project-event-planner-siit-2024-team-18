import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-invited-events',
  templateUrl: './invited-events.component.html',
  styleUrls: ['./invited-events.component.css'],
})
export class InvitedEventsComponent implements OnInit {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  loading = true;

  currentPage = 1;
  eventsPerPage = 5;
  totalPages = 1;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInvitedEvents();
  }

  fetchInvitedEvents(): void {
    this.eventService.getInvitedEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.calculateTotalPages();
        this.updatePaginatedEvents();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching invited events:', err);
        this.loading = false;
      },
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.events.length / this.eventsPerPage);
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    this.paginatedEvents = this.events.slice(startIndex, startIndex + this.eventsPerPage);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  openEventDetails(eventId: number): void {
    this.eventService.openEventDetails(eventId);
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedEvents();
  }
}
