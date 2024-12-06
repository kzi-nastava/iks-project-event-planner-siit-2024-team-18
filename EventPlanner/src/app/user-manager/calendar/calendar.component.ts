import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  calendarEvents = [
    { title: 'Meeting', start: new Date(), description: 'Important meeting' },
    { title: 'Conference', start: new Date(new Date().setDate(new Date().getDate() + 1)), description: 'Annual conference' }
  ];

  calendarOptions: CalendarOptions = {};

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      import('@fullcalendar/core').then((FullCalendar) => {
        this.calendarOptions = {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          weekends: true,
          events: this.calendarEvents,
        };
      });
    }
  }
}
