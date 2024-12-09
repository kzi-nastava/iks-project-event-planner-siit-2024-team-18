import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { EventCard } from '../../../models/event-card.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent implements OnInit {
  events: EventCard[] = [];
  loading = true;

  currentPage = 0;
  eventsPerPage = 10;
  totalPages = 1;

  searchQuery = '';
  fromDate: string | undefined = undefined;
  toDate: string | undefined = undefined;
  selectedFilter = 'name';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  sortOptions = [
    { value: 'name', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
    { value: 'maxParticipants', label: 'Max participants' },
    { value: 'budget', label: 'Budget' },
    { value: 'eventType', label: 'Event type' },
    { value: 'organizerFirstName', label: 'Creator Name' },
  ];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    const filters = {
      keyword: this.searchQuery,
      city: '',
      startDate: this.fromDate,
      endDate: this.toDate,
      country: '',
      organizerFirstName: '',
      eventType: this.selectedFilter === 'eventType' && this.searchQuery ? this.searchQuery : undefined,
      maxParticipants: this.selectedFilter === 'maxParticipants' && !isNaN(Number(this.searchQuery)) ? Number(this.searchQuery) : undefined,
      budget: this.selectedFilter === 'budget' && !isNaN(Number(this.searchQuery)) ? Number(this.searchQuery) : undefined,
      sortBy: this.selectedFilter === 'country' || this.selectedFilter === 'city' || this.selectedFilter === 'organizerFirstName' ? undefined : this.selectedFilter,
      sortDirection: this.sortOrder,
      page: this.currentPage,
      pageSize: this.eventsPerPage
    };
    
    this.eventService.getAllEvents(filters).subscribe({
      next: (response: PagedResponse<EventCard>) => {
        this.events = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.loading = false;
      },
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchEvents();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchEvents();
    }
  }

  openEventDetails(eventId: number): void {
    this.eventService.openEventDetails(eventId);
  }
}
