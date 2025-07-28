import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { EventTypeService } from '../../services/event-type.service';
import { LocationService } from '../../services/location.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrl: './create-event.component.css',
})
export class CreateEventComponent implements OnInit {
    images: File[] = [];
    createEventForm: FormGroup;
    eventTypesList: string[] = [];
    autocompleteOptions: any[] = [];
    selectedLocationDetails: any = null;
    fileUrlCache = new Map<File, string>();

    constructor(
        private eventTypeService: EventTypeService,
        private locationService: LocationService,
        private eventService: EventService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.createEventForm = new FormGroup({
            eventTypes: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            maxParticipants: new FormControl('', [
                Validators.required,
                Validators.min(1),
                Validators.pattern('^[0-9]*$'),
            ]),
            privacyType: new FormControl('PUBLIC', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            date: new FormControl('', [
                Validators.required,
                this.futureDateValidator(),
            ]),
            time: new FormControl('', [Validators.required]),
            images: new FormControl<File[]>([], this.minImagesValidator()),
        });
    }

    ngOnInit(): void {
        this.loadEventTypes();

        this.createEventForm
            .get('location')
            ?.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value: string) =>
                    value
                        ? this.locationService.getAutocompleteLocations(value)
                        : []
                )
            )
            .subscribe((results) => {
                this.autocompleteOptions = results || [];
            });
    }

    loadEventTypes(): void {
        this.eventTypeService.getAll().subscribe({
            next: (data) => {
                this.eventTypesList = data.map((eventType) => eventType.name);
            },
            error: (err) => console.error('Error fetching event types:', err),
        });
    }

    futureDateValidator(): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            if (control.value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(control.value);

                return selectedDate <= today ? { pastDate: true } : null;
            }
            return null;
        };
    }

    minImagesValidator(): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            const files = control.value as (File | string)[];
            return files && files.length > 0 ? null : { minImages: true };
        };
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        Array.from(input.files || []).forEach((file) => {
            this.images.push(file);
        });
        this.createEventForm.get('images')?.setValue(this.images);
        this.createEventForm.get('images')?.updateValueAndValidity();
    }

    removeImage(index: number): void {
        this.images.splice(index, 1);
        this.createEventForm.get('images')?.setValue(this.images);
        this.createEventForm.get('images')?.updateValueAndValidity();
    }

    imageToUrl(file: File): string {
        if (!this.fileUrlCache.has(file)) {
            const url = URL.createObjectURL(file);
            this.fileUrlCache.set(file, url);
        }
        return this.fileUrlCache.get(file) as string;
    }

    ngOnDestroy(): void {
        this.fileUrlCache.forEach((url) => URL.revokeObjectURL(url));
    }

    onLocationSelected(selectedLocation: any): void {
        this.createEventForm
            .get('location')
            ?.setValue(selectedLocation.displayName);

        this.locationService
            .getLocationDetails(selectedLocation.displayName)
            .subscribe((details) => {
                this.selectedLocationDetails = details;
                console.log('Location Details:', details);
            });
    }

    create(): void {
        if (this.createEventForm.valid) {
            const formValues = this.createEventForm.value;

            const selectedDate = new Date(formValues.date);
            const time = formValues.time;

            let hours: number, minutes: number;

            if (time.includes('AM') || time.includes('PM')) {
                const [timePart, modifier] = time.split(' ');
                [hours, minutes] = timePart.split(':').map(Number);

                if (modifier === 'PM' && hours < 12) {
                    hours += 12;
                }
                if (modifier === 'AM' && hours === 12) {
                    hours = 0;
                }
                selectedDate.setHours(hours, minutes, 0);
            }

            const formData = new FormData();

            formData.append('id', '0');
            formData.append('name', formValues.name);
            formData.append('description', formValues.description);
            formData.append('maxParticipants', formValues.maxParticipants);
            formData.append('privacyType', formValues.privacyType);

            const formattedDate = selectedDate.toLocaleString('sv-SE').replace(' ', 'T');
            formData.append('startDate', formattedDate);
            
            formData.append('eventType', formValues.eventTypes);
            formData.append('locationName', this.selectedLocationDetails?.name || '');
            formData.append('city', this.selectedLocationDetails?.city || '');
            formData.append('country', this.selectedLocationDetails?.country || '');
            formData.append('latitude', (this.selectedLocationDetails?.latitude || 0).toString());
            formData.append('longitude', (this.selectedLocationDetails?.longitude || 0).toString());

            this.images.forEach((file) => {
                formData.append('images', file, file.name);
            });

            this.eventService.create(formData).subscribe({
                next: () => {
                    this.router.navigate(['/events']);
                    this.snackBar.open('Event successfully created!', 'OK', {
                        duration: 3000,
                    });
                },
                error: (err) => {
                    console.error('Error creating event:', err);
                    this.snackBar.open(
                        'An unexpected error occurred while creating the Event.',
                        'OK',
                        {
                            duration: 3000,
                        }
                    );
                },
            });
        }
    }
}
