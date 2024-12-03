import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent implements OnInit {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  filteredEvents: Event[] = [];
  loading = true;

  currentPage = 1;
  eventsPerPage = 5;
  totalPages = 1;

  searchQuery = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedFilter = 'title';
  sortOrder = 'asc';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = [...this.events];
        this.calculateTotalPages();
        this.updatePaginatedEvents();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, startIndex + this.eventsPerPage);
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

  applySearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEvents = this.events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
        //event.location.toLowerCase().includes(query)
    );
    this.resetPagination();
  }

  applyDateFilter(): void {
    // this.filteredEvents = this.events.filter((event) => {
    //   const eventDate = new Date(event.date);
    //   return (!this.fromDate || eventDate >= this.fromDate) && (!this.toDate || eventDate <= this.toDate);
    // });
    this.resetPagination();
  }

  applySort(): void {
    const compare = (a: string, b: string) =>
      this.sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);

    this.filteredEvents.sort((a, b) => {
      if (this.selectedFilter === 'title') return compare(a.title, b.title);
      if (this.selectedFilter === 'description') return compare(a.description, b.description);
      //if (this.selectedFilter === 'location') return compare(a.location, b.location);
      return 0;
    });

    this.resetPagination();
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedEvents();
  }
}
