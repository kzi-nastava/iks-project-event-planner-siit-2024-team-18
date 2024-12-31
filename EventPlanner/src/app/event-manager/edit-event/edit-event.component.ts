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
  editEventForm: FormGroup;
  eventTypesList: string[] = [];
  selectedImages: string[] = [];
  autocompleteOptions: any[] = [];
  selectedLocationDetails: any = null;

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
          value ? this.locationService.getAutocompleteLocations(value) : []
        )
      )
      .subscribe((results) => {
        this.autocompleteOptions = results || [];
      });
  }

  loadEventData(id: number): void {
    this.eventService.getEventForUpdate(id).subscribe({
      next: (event) => {
        this.selectedImages.push(...event.images);
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
    this.editEventForm.get('location')?.setValue(selectedLocation.displayName);

    this.locationService
      .getLocationDetails(selectedLocation.displayName)
      .subscribe((details) => {
        this.selectedLocationDetails = details;
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

      const eventPayload = {
        id: 0,
        name: formValues.name,
        description: formValues.description,
        maxParticipants: formValues.maxParticipants,
        privacyType: formValues.privacyType,
        startDate: selectedDate,
        images: this.selectedImages,
        eventType: formValues.eventTypes,
        locationName: this.selectedLocationDetails?.name || '',
        city: this.selectedLocationDetails?.city || '',
        country: this.selectedLocationDetails?.country || '',
        latitude: this.selectedLocationDetails?.latitude || 0,
        longitude: this.selectedLocationDetails?.longitude || 0,
      };

      this.eventService.update(eventPayload, this.id).subscribe({
        next: () => {
          this.router.navigate(['/events']);
          this.snackBar.open('Event successfully updated!', 'OK', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error updating event:', err);
          this.snackBar.open('An unexpected error occurred while updating the Event.', 'OK', {
            duration: 3000,
          });
        },
      });
    }
  }
}
