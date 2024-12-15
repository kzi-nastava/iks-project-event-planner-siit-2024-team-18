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
  createEventForm: FormGroup;
  eventTypesList: string[] = [];
  selectedImages: string[] = [];
  autocompleteOptions: any[] = [];
  selectedLocationDetails: any = null;

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
        Validators.pattern('^[0-9]*$')
      ]),
      privacyType: new FormControl('Public', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required, this.futureDateValidator()]),
      time: new FormControl('', [Validators.required]),
      selectedImages: new FormControl([], this.minImagesValidator()),
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
          value ? this.locationService.getAutocompleteLocations(value) : []
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
    return (control: AbstractControl): { [key: string]: boolean } | null => {
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
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && control.value.length > 0
        ? null
        : { minImages: true };
    };
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  onLocationSelected(selectedLocation: any): void {
    this.createEventForm.get('location')?.setValue(selectedLocation.displayName);

    this.locationService
      .getLocationDetails(selectedLocation.displayName)
      .subscribe((details) => {
        this.selectedLocationDetails = details;
        console.log('Location Details:', details);
      });
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            this.selectedImages.push(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
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

      const eventPayload = {
        id: 0,
        name: formValues.name,
        description: formValues.description,
        maxParticipants: formValues.maxParticipants,
        privacyType: formValues.privacyType,
        date: selectedDate,
        images: this.selectedImages,
        eventType: formValues.eventTypes,
        locationName: this.selectedLocationDetails?.name || '',
        city: this.selectedLocationDetails?.city || '',
        country: this.selectedLocationDetails?.country || '',
        latitude: this.selectedLocationDetails?.latitude || 0,
        longitude: this.selectedLocationDetails?.longitude || 0,
      };

      this.eventService.create(eventPayload).subscribe({
        next: () => {
          this.router.navigate(['/events']);
          this.snackBar.open('Event successfully created!', 'OK', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error creating event:', err);
          this.snackBar.open('An unexpected error occurred while creating the Event.', 'OK', {
            duration: 3000,
          });
        },
      });
    }
  }
}
