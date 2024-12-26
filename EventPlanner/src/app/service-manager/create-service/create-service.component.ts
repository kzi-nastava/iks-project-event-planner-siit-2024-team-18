import { Component, OnInit } from '@angular/core';
import { ServiceManagerService } from '../../services/service-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from '../../models/service.model';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { EventTypeService } from '../../services/event-type.service';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  images: string[] = [];
  eventTypes: string[] = [];
  categories: string[] = [];
  filteredCategories: string[] = this.categories.slice();
  filteredEventTypes: string[] = this.eventTypes.slice();
  selectedLocationDetails: any = null;
  autocompleteOptions: any[] = [];

  constructor(
    private serviceManagerService: ServiceManagerService,
    private router: Router,
    private locationService: LocationService,
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
  ) {}

  createServiceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    images: new FormControl([], this.minImagesValidator()),
    isVisible: new FormControl(false),
    isAvailable: new FormControl(false),
    category: new FormControl('', [Validators.required]),
    eventTypes: new FormControl([], [Validators.required]),
    location: new FormControl('', [Validators.required]),
    reservationType: new FormControl('AUTOMATIC', [Validators.required]),
    specifics: new FormControl('', [Validators.required]),
    duration: new FormControl(15, [Validators.min(15), Validators.max(120)]),
    minEngagement: new FormControl(1, [Validators.min(1), Validators.max(5)]),
    maxEngagement: new FormControl(1, [Validators.min(1), Validators.max(5)]),
    reservationDeadline: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    cancellationDeadline: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    workingHoursStart: new FormControl('', [Validators.required]),
    workingHoursEnd: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadEventTypes();
    this.loadCategories();

    this.createServiceForm.get('location')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value: string | null): value is string => !!value),
      switchMap((value: string) => this.locationService.getAutocompleteLocations(value))
    ).subscribe({
      next: (results) => {
        this.autocompleteOptions = results || [];
      },
      error: (err) => console.error('Error fetching locations:', err),
    });
  }

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
  }

  create() {
    if (this.createServiceForm.valid) {
      const formValues = this.createServiceForm.value;

      const workingHoursStart = this.formatTime(formValues.workingHoursStart!);
      const workingHoursEnd = this.formatTime(formValues.workingHoursEnd!);

      const service: Service = {
        id: Math.random(),
        name: this.createServiceForm.value.name!,
        description: this.createServiceForm.value.description!,
        price: this.createServiceForm.value.price!,
        discount: this.createServiceForm.value.discount || 0,
        images: this.images,
        isVisible: this.createServiceForm.value.isVisible!,
        isAvailable: this.createServiceForm.value.isAvailable!,
        category: this.createServiceForm.value.category!,
        eventTypes: this.createServiceForm.value.eventTypes!,
        location: this.selectedLocationDetails?.name || '',
        creator: 'Mare',
        isDeleted: false,
        status: 'PENDING',
        reservationType: this.createServiceForm.value.reservationType as 'AUTOMATIC' | 'MANUAL',
        
        specifics: this.createServiceForm.value.specifics!,
        duration: this.createServiceForm.value.duration!,
        minEngagement: this.createServiceForm.value.minEngagement!,
        maxEngagement: this.createServiceForm.value.maxEngagement!,
        reservationDeadline: this.createServiceForm.value.reservationDeadline!,
        cancellationDeadline: this.createServiceForm.value.cancellationDeadline!,
        workingHoursStart: workingHoursStart,
        workingHoursEnd: workingHoursEnd,
  
        city: this.selectedLocationDetails?.city || '',
        country: this.selectedLocationDetails?.country || '',
        latitude: this.selectedLocationDetails?.latitude || 0,
        longitude: this.selectedLocationDetails?.longitude || 0,
      };

      this.serviceManagerService
        .createService(service)
        .subscribe((res: any) => {
          this.router.navigate(['/services']);
        });
    }
  }

  formatTime(time: string): string {
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
    } else {
      [hours, minutes] = time.split(':').map(Number);
    }
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }
  
  onFileSelected(event: any): void {
    if (event.target.files) {
      for (let file of event.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            this.images.push(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  filterCategories(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredCategories = this.categories.filter(option =>
      option.toLowerCase().includes(value)
    );
  }

  filterEventTypes(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredEventTypes = this.eventTypes.filter(option =>
      option.toLowerCase().includes(value)
    );
  }

  onLocationSelected(selectedLocation: any): void {
    this.createServiceForm.get('location')?.setValue(selectedLocation.displayName);

    this.locationService
      .getLocationDetails(selectedLocation.displayName)
      .subscribe((details) => {
        this.selectedLocationDetails = details;
      });
  }

  loadEventTypes(): void {
    this.eventTypeService.getAll().subscribe({
      next: (data) => {
        this.eventTypes = data.map((eventType) => eventType.name);
      },
      error: (err) => console.error('Error fetching event types:', err),
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map((category) => category.name);
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }
}
