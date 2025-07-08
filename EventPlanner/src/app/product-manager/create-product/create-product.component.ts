import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { EventTypeService } from '../../services/event-type.service';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  images: File[] = [];
  eventTypes: string[] = [];
  categories: string[] = [];
  filteredCategories: string[] = this.categories.slice();
  filteredEventTypes: string[] = this.eventTypes.slice();
  selectedLocationDetails: any = null;
  autocompleteOptions: any[] = [];
  fileUrlCache = new Map<File, string>();

  constructor(
    private productManagerService: ProductManagerService,
    private router: Router,
    private locationService: LocationService,
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
  ) {}

  createProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    images: new FormControl<File[]>([], this.minImagesValidator()),
    isVisible: new FormControl(false),
    isAvailable: new FormControl(false),
    category: new FormControl('', [Validators.required]),
    eventTypes: new FormControl([], [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadEventTypes();
    this.loadCategories();

    this.createProductForm.get('location')?.valueChanges.pipe(
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
    if (this.createProductForm.valid) {
      const formValues = this.createProductForm.value;
      const formData = new FormData();
  
      formData.append('name', formValues.name!);
      formData.append('description', formValues.description!);
      formData.append('price', formValues.price!.toString());
      formData.append('discount', (formValues.discount || 0).toString());
      formData.append('isVisible', formValues.isVisible!.toString());
      formData.append('isAvailable', formValues.isAvailable!.toString());
      formData.append('category', formValues.category!);
      formData.append('location', formValues.location!);
      formData.append('status', "PENDING");
  
      formData.append('city', this.selectedLocationDetails?.city || '');
      formData.append('country', this.selectedLocationDetails?.country || '');
      formData.append('longitude', this.selectedLocationDetails?.longitude || 0);
      formData.append('latitude', this.selectedLocationDetails?.latitude || 0);
  
      this.createProductForm.value.eventTypes!.forEach((eventType) => {
        formData.append('eventTypes', eventType);
      });
  
      this.images.forEach((file) => {
        formData.append('images', file, file.name);
      });
  
      this.productManagerService.createProduct(formData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error creating product:', err),
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
    Array.from(input.files || []).forEach(file => {
      this.images.push(file);
    });
    this.createProductForm.get('images')?.setValue(this.images);
    this.createProductForm.get('images')?.updateValueAndValidity();
  }
  
  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.createProductForm.get('images')?.setValue(this.images);
    this.createProductForm.get('images')?.updateValueAndValidity();
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
    this.createProductForm.get('location')?.setValue(selectedLocation.displayName);

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
}
