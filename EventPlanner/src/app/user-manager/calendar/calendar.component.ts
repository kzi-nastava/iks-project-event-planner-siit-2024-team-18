import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
    CalendarOptions,
    EventClickArg,
    EventInput,
} from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../services/event.service';
import { CalendarEvent } from '../../models/calendar-event.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
    events: CalendarEvent[] = [];
    calendarEvents: EventInput[] = [];
    calendarOptions: CalendarOptions = {};

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private eventService: EventService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.eventService.getAcceptedEvents().subscribe((data: CalendarEvent[]) => {
            this.events = data;

            this.calendarEvents = this.events.map((event) => ({
                id: String(event.id),
                title: event.title,
                start: event.start,
                end: event.end,
                color: this.getRandomColor(),
            }));

            if (typeof window !== 'undefined') {
                import('@fullcalendar/core').then(() => {
                    this.calendarOptions = {
                        plugins: [dayGridPlugin],
                        initialView: 'dayGridMonth',
                        weekends: true,
                        events: this.calendarEvents,
                        eventClick: this.onEventClick.bind(this),
                    };
                });
            }
        });
    }

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    onEventClick(arg: EventClickArg): void {
    const eventId = arg.event.id;
    if (eventId) {
        this.router.navigate(['/event', eventId]);
    }
}
}
