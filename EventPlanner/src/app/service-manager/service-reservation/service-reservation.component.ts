import { Component } from '@angular/core';

@Component({
  selector: 'app-service-reservation',
  templateUrl: './service-reservation.component.html',
  styleUrls: ['./service-reservation.component.css'],
})
export class ServiceReservationComponent {
  events = [
    { id: 1, name: 'Event A' },
    { id: 2, name: 'Event B' },
    { id: 3, name: 'Event C' },
  ];

  serviceProviderId = '123';
  selectedEvent = '';
  reservation = {
    date: '',
    fromTime: '',
    toTime: '',
  };

  bookService() {
    console.log('Service booked:', this.reservation);
  }

  closeModal() {
    console.log('Modal closed');
  }
}
