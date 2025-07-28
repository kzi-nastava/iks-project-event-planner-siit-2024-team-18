import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './../../services/event.service';
import { Event } from '../../models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
    event!: Event;
    activities: Activity[] = [];

    constructor(
        private eventService: EventService,
        private activityService: ActivityService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    agendaForm = new FormGroup(
        {
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            startDate: new FormControl<Date | null>(null),
            startTime: new FormControl(''),
            endDate: new FormControl<Date | null>(null, [Validators.required]),
            endTime: new FormControl('', [Validators.required]),
        },
        { validators: this.endAfterStartValidator() }
    );

    endAfterStartValidator(): ValidatorFn {
        return (group: AbstractControl): { [key: string]: boolean } | null => {
            const startDate = group.get('startDate')?.value;
            const startTime = group.get('startTime')?.value;
            const endDate = group.get('endDate')?.value;
            const endTime = group.get('endTime')?.value;

            if (!startDate || !startTime || !endDate || !endTime) {
                return null;
            }

            const start = combineDateAndTime(startDate, startTime);
            const end = combineDateAndTime(endDate, endTime);

            return end > start ? null : { endBeforeStart: true };
        };
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const eventId = +params['id'];
            this.eventService.getEventById(eventId).subscribe({
                next: (event) => {
                    this.event = event!;
                    if (this.activities.length === 0) {
                        this.setStartDateAndTimeForNextActivity();
                    }
                    this.loadActivities();
                },
                error: (err) => {
                    console.error('Error fetching event:', err);
                    this.snackBar.open('Error fetching event.', 'OK', {
                        duration: 3000,
                    });
                },
            });
        });
    }

    loadActivities() {
        this.activityService.getAllByEventId(this.event.id).subscribe({
            next: (activities: Activity[]) => {
                this.activities = activities;
                this.setStartDateAndTimeForNextActivity();
            },
            error: (err) => {
                console.error('Error fetching activities:', err);
                this.snackBar.open('Error fetching activities.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    private formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    private setStartDateAndTimeForNextActivity(): void {
        let startDate: Date;
        let startTime: string;

        if (this.activities.length === 0) {
            const eventDate = new Date(this.event.startDate);
            startDate = eventDate;
            startTime = this.formatTime(eventDate);
        } else {
            const lastActivity = this.activities[this.activities.length - 1];
            startDate = new Date(lastActivity.endDate);
            startTime = this.formatTime(startDate);
        }

        this.agendaForm.patchValue({
            startDate,
            startTime,
        });
    }

    addActivity() {
        this.agendaForm.markAllAsTouched();
        this.agendaForm.updateValueAndValidity();
        if (this.agendaForm.valid) {
            const startDate = combineDateAndTime(
                this.agendaForm.value.startDate!,
                this.agendaForm.value.startTime!
            );
            const endDate = combineDateAndTime(
                this.agendaForm.value.endDate!,
                this.agendaForm.value.endTime!
            );

            const activity: Activity = {
                id: 0,
                name: this.agendaForm.value.name!,
                description: this.agendaForm.value.description!,
                location: this.agendaForm.value.location!,
                startDate,
                endDate,
            };

            this.activityService.create(activity, this.event.id).subscribe({
                next: (newActivity: Activity) => {
                    this.activities = [...this.activities, newActivity];
                    this.setStartDateAndTimeForNextActivity();
                },
                error: (err) => {
                    console.error('Error adding activity:', err);
                    this.snackBar.open('Error adding activity.', 'OK', {
                        duration: 3000,
                    });
                },
            });

            this.agendaForm.reset();
            this.setStartDateAndTimeForNextActivity();
        }
    }

    editActivity(activity: Activity) {
        const dialogRef = this.dialog.open(EditActivityComponent, {
            width: '100%',
            maxWidth: '60vw',
            data: {
                activity: { ...activity },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (result.delete) {
                    this.activityService.delete(activity.id).subscribe({
                        next: () => {
                            this.loadActivities();
                            this.setStartDateAndTimeForNextActivity();
                        },
                        error: (err) => {
                            console.error('Error fetching activities:', err);
                            this.snackBar.open(
                                'Error fetching activities.',
                                'OK',
                                {
                                    duration: 3000,
                                }
                            );
                        },
                    });
                } else {
                    this.activityService.update(result).subscribe({
                        next: () => {
                            this.loadActivities();
                            this.setStartDateAndTimeForNextActivity();
                        },
                        error: (err) => {
                            console.error('Error fetching activities:', err);
                            this.snackBar.open(
                                'Error fetching activities.',
                                'OK',
                                {
                                    duration: 3000,
                                }
                            );
                        },
                    });
                }
            }
        });
    }
}

function combineDateAndTime(date: Date, time: string): Date {
    if (!time) return new Date(NaN);

    let hours = 0;
    let minutes = 0;

    const timeParts = time.trim().toLowerCase();

    if (timeParts.includes('am') || timeParts.includes('pm')) {
        const match = timeParts.match(/(\d+):(\d+)\s?(am|pm)/);
        if (!match) return new Date(NaN);

        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        const meridian = match[3];

        if (meridian === 'pm' && hours !== 12) hours += 12;
        if (meridian === 'am' && hours === 12) hours = 0;
    } else {
        const parts = time.split(':');
        if (parts.length < 2) return new Date(NaN);
        hours = parseInt(parts[0], 10);
        minutes = parseInt(parts[1], 10);
    }

    const combined = new Date(date);
    combined.setHours(hours + 2);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
}
