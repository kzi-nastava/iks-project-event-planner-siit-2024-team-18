import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ReservationService } from '../../services/reservation.service';
import { ServiceManagerService } from '../../services/service-manager.service';
import { Reservation } from '../../models/reservation.model';
import { Service } from '../../models/service.model';
import { EventCard } from '../../models/event-card.model';

@Component({
  selector: 'app-service-reservation',
  templateUrl: './service-reservation.component.html',
  styleUrls: ['./service-reservation.component.css'],
})
export class ServiceReservationComponent implements OnInit {
  serviceId!: number;
  serviceProvider?: string;
  serviceDuration: number | undefined = undefined;
  events: EventCard[] = [];
  currentReservations: Reservation[] = [];
  selectedEvent!: EventCard;

  reservation = {
    date: '',
    fromTime: '',
    toTime: '',
  };

  isReserving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private reservationService: ReservationService,
    private serviceManagerService: ServiceManagerService
  ) {}

  ngOnInit(): void {
    this.serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchServiceDetails();
    this.fetchEventsByOrganizer();
    this.fetchCurrentReservations();
  }

  fetchServiceDetails(): void {
    this.serviceManagerService.getServiceById(this.serviceId).subscribe({
      next: (service: Service) => {
        this.serviceDuration = service.duration;
        this.serviceProvider = service.creator;
      },
      error: () => {
        alert('Failed to fetch service details. Please try again later.');
      },
    });
  }

  fetchEventsByOrganizer(): void {
    this.eventService.getEventsByOrganizerId().subscribe({
      next: (result: EventCard[]) => {
        this.events = result;
        this.selectedEvent = this.events[0];
      },
      error: () => {
        alert('Failed to fetch events by organizer. Please try again later.');
      },
    });
  }

  fetchCurrentReservations(): void {
    this.reservationService.getReservationsByServiceId(this.serviceId).subscribe({
      next: (reservations: Reservation[]) => {
        this.currentReservations = reservations;
      },
      error: () => {
        alert('Failed to fetch current reservations. Please try again later.');
      },
    });
  }

  isToTimeDisabled: boolean = false;

  onFromTimeChange(): void {
    if (this.serviceDuration) {
      const fromTime = this.reservation.fromTime;
      if (fromTime) {
        const [hours, minutes] = fromTime.split(':').map(Number);
        const calculatedToTime = new Date();
        const totalMinutes = minutes + this.serviceDuration;
        calculatedToTime.setHours(hours + Math.floor(totalMinutes / 60), totalMinutes % 60, 0);

        this.reservation.toTime = calculatedToTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        this.isToTimeDisabled = true;
      } else {
        this.isToTimeDisabled = false;
      }
    } else {
      this.isToTimeDisabled = false;
    }
  }


  validateFields(): boolean {
    if (!this.reservation.date || !this.reservation.fromTime || !this.reservation.toTime) {
      alert('All fields are required. Please fill in all the details.');
      return false;
    }

    const selectedDate = new Date(this.reservation.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      alert('The selected date cannot be in the past. Please choose a future date.');
      return false;
    }

    const fromTime = new Date(`1970-01-01T${this.reservation.fromTime}:00`);
    const toTime = new Date(`1970-01-01T${this.reservation.toTime}:00`);

    if (fromTime >= toTime) {
      alert('Start time cannot be greater than or equal to end time. Please adjust the times.');
      return false;
    }

    return true;
  }

  bookService(): void {
    if (!this.validateFields()) {
      return;
    }

    const reservationData = {
      serviceId: this.serviceId,
      eventId: this.selectedEvent.id,
      date: this.reservation.date,
      timeFrom: this.reservation.fromTime,
      timeTo: this.reservation.toTime,
    };

    this.isReserving = true;

    this.reservationService.createReservation(reservationData).subscribe({
      next: () => {
        alert('Reservation successfully created!');
        this.fetchCurrentReservations();
      },
      error: () => {
        alert('Failed to create reservation. Please try again later.');
        this.isReserving = false;
      },
      complete: () => {
        this.isReserving = false;
      },
    });
  }

  closeModal(): void {
    this.router.navigate([`/service/${this.serviceId}`]);
  }
}
