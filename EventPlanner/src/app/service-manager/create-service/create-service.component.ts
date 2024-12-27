import { Component, OnInit } from '@angular/core';
import { ServiceManagerService } from '../../services/service-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  uploadedFiles: File[] = [];
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
    images: new FormControl<(File | string)[]>([], this.minImagesValidator()),
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
      const files = control.value as (File | string)[];
      return (files && files.length > 0) ? null : { minImages: true };
    };
  }

  create() {
    if (this.createServiceForm.valid) {
      const formValues = this.createServiceForm.value;
      const formData = new FormData();
  
      formData.append('name', formValues.name!);
      formData.append('description', formValues.description!);
      formData.append('price', formValues.price!.toString());
      formData.append('discount', (formValues.discount || 0).toString());
      formData.append('isVisible', formValues.isVisible!.toString());
      formData.append('isAvailable', formValues.isAvailable!.toString());
      formData.append('category', formValues.category!);
      formData.append('creator', "Mare");
      formData.append('location', formValues.location!);
      formData.append('status', "PENDING");
  
      formData.append('specifics', formValues.specifics!);
      formData.append('duration', formValues.duration!.toString());
      formData.append('minEngagement', formValues.minEngagement!.toString());
      formData.append('maxEngagement', formValues.maxEngagement!.toString());
      formData.append('reservationDeadline', formValues.reservationDeadline!.toString());
      formData.append('cancellationDeadline', formValues.cancellationDeadline!.toString());
      formData.append('reservationType', formValues.reservationType!);
      formData.append('workingHoursStart', this.formatTime(formValues.workingHoursStart!));
      formData.append('workingHoursEnd', this.formatTime(formValues.workingHoursEnd!));
  
      formData.append('city', this.selectedLocationDetails?.city || '');
      formData.append('country', this.selectedLocationDetails?.country || '');
      formData.append('longitude', this.selectedLocationDetails?.longitude || 0);
      formData.append('latitude', this.selectedLocationDetails?.latitude || 0);
  
      this.createServiceForm.value.eventTypes!.forEach((eventType) => {
        formData.append('eventTypes', eventType);
      });
  
      this.uploadedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });
  
      this.serviceManagerService.createService(formData).subscribe({
        next: () => this.router.navigate(['/services']),
        error: (err) => console.error('Error creating service:', err),
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
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.uploadedFiles.push(file);
          this.createServiceForm.get('images')?.setValue(this.uploadedFiles.map((file) => file.name));
        };
        reader.readAsDataURL(file);
      });
  
      input.value = "";
    }
  }
  
  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.uploadedFiles.splice(index, 1);
    this.createServiceForm.get('images')?.setValue(this.uploadedFiles);
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
