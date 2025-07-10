import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    FormGroup,
    FormControl,
    Validators,
    ValidatorFn,
    AbstractControl,
} from '@angular/forms';
import { Activity } from '../../models/activity.model';

@Component({
    selector: 'app-edit-activity',
    templateUrl: './edit-activity.component.html',
    styleUrls: ['./edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
    activityForm: FormGroup;
    activity!: Activity;

    constructor(
        public dialogRef: MatDialogRef<EditActivityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { activity: Activity }
    ) {
        const start = new Date(data.activity.startDate);
        const end = new Date(data.activity.endDate);

        this.activityForm = new FormGroup(
            {
                name: new FormControl(data.activity.name, [
                    Validators.required,
                ]),
                description: new FormControl(data.activity.description, [
                    Validators.required,
                ]),
                location: new FormControl(data.activity.location, [
                    Validators.required,
                ]),
                startDate: new FormControl<Date | null>(start),
                startTime: new FormControl(this.formatTime(start)),
                endDate: new FormControl<Date | null>(end, [
                    Validators.required,
                ]),
                endTime: new FormControl(this.formatTime(end), [
                    Validators.required,
                ]),
            },
            { validators: this.endAfterStartValidator() }
        );
        this.activity = data.activity;
    }

    private formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

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

    ngOnInit(): void {}

    save() {
        this.activityForm.markAllAsTouched();
        this.activityForm.updateValueAndValidity();
        if (this.activityForm.valid) {
            const startDate = combineDateAndTime(
                this.activityForm.value.startDate!,
                this.activityForm.value.startTime!
            );
            const endDate = combineDateAndTime(
                this.activityForm.value.endDate!,
                this.activityForm.value.endTime!
            );

            const updatedActivity: Activity = {
                id: this.activity.id,
                name: this.activityForm.value.name!,
                description: this.activityForm.value.description!,
                location: this.activityForm.value.location!,
                startDate,
                endDate,
            };

            this.dialogRef.close(updatedActivity);
        }
    }

    delete() {
        this.dialogRef.close({ delete: true });
    }

    cancel() {
        this.dialogRef.close(null);
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
