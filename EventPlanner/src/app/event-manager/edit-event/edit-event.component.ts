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
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrl: './edit-event.component.css',
})
export class EditEventComponent implements OnInit {
    id: number = 0;
    images: File[] = [];
    editEventForm: FormGroup;
    eventTypesList: string[] = [];
    selectedImages: string[] = [];
    autocompleteOptions: any[] = [];
    selectedLocationDetails: any = null;
    fileUrlCache = new Map<File, string>();

    constructor(
        private eventTypeService: EventTypeService,
        private locationService: LocationService,
        private eventService: EventService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        this.editEventForm = new FormGroup({
            eventTypes: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            maxParticipants: new FormControl('', [
                Validators.required,
                Validators.min(1),
                Validators.pattern('^[0-9]*$'),
            ]),
            privacyType: new FormControl('Public', [Validators.required]),
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
        this.activatedRoute.paramMap.subscribe((params) => {
            const idParam = params.get('id');
            if (idParam) {
                this.id = +idParam;
                this.loadEventData(this.id);
            }
        });

        this.loadEventTypes();

        this.editEventForm
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

    loadEventData(id: number): void {
        this.eventService.getEventForUpdate(id).subscribe({
            next: (event) => {
                this.editEventForm.patchValue({
                    eventTypes: event.eventType,
                    name: event.name,
                    description: event.description,
                    maxParticipants: event.maxParticipants,
                    privacyType: event.privacyType,
                    location: event.locationName,
                    date: event.startDate,
                    time: this.formatTime(new Date(event.startDate)),
                });

                event.images.map((img) => img).forEach((image, index) => {
                const byteString = atob(image.split(',')[1]);
                const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
                const byteArray = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                  byteArray[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([byteArray], { type: mimeString });
                const file = new File([blob], `image_${index}.jpg`, { type: mimeString });
                this.images.push(file);
              });

              this.editEventForm.get('images')?.setValue(this.images);
              this.editEventForm.get('images')?.updateValueAndValidity();
            },
            error: (err) => {
                console.error('Error fetching event details:', err);
                this.snackBar.open('Error loading event details.', 'OK', {
                    duration: 3000,
                });
            },
        });
    }

    formatTime(date: Date): string {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hours}:${minutesStr} ${ampm}`;
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
        this.editEventForm.get('images')?.setValue(this.images);
        this.editEventForm.get('images')?.updateValueAndValidity();
    }

    removeImage(index: number): void {
        this.images.splice(index, 1);
        this.editEventForm.get('images')?.setValue(this.images);
        this.editEventForm.get('images')?.updateValueAndValidity();
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
        this.editEventForm
            .get('location')
            ?.setValue(selectedLocation.displayName);

        this.locationService
            .getLocationDetails(selectedLocation.displayName)
            .subscribe((details) => {
                this.selectedLocationDetails = details;
            });
    }

    update(): void {
        if (this.editEventForm.valid) {
            const formValues = this.editEventForm.value;

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

            this.eventService.update(formData, this.id).subscribe({
                next: () => {
                    this.router.navigate(['/events']);
                    this.snackBar.open('Event successfully updated!', 'OK', {
                        duration: 3000,
                    });
                },
                error: (err) => {
                    console.error('Error updating event:', err);
                    this.snackBar.open(
                        'An unexpected error occurred while updating the Event.',
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
