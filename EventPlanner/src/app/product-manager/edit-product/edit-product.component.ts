import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from '../../services/product-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { EventTypeService } from '../../services/event-type.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number = 0;

  uploadedFiles: File[] = [];
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
    private route: ActivatedRoute,
    private locationService: LocationService,
    private eventTypeService: EventTypeService,
  ) {}

  ngOnInit(): void {
    this.loadEventTypes();

    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductData();
    });

    this.editProductForm.get('category')?.disable();

    this.editProductForm.get('location')?.valueChanges.pipe(
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

  editProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    uploadedFiles: new FormControl<File[]>([], this.minImagesValidator()),
    isVisible: new FormControl(false),
    isAvailable: new FormControl(false),
    category: new FormControl('', [Validators.required]),
    eventTypes: new FormControl<string[]>([], [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  loadProductData(): void {
    this.productManagerService.getProductById(this.productId).subscribe({
      next: (data: Product) => {
        const product = data;
        if (product) {
          this.editProductForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            isVisible: product.isVisible,
            isAvailable: product.isAvailable,
            category: product.category,
            eventTypes: product.eventTypes,
            location: product.location,
          });

          product.images.map((img) => img).forEach((image, index) => {
            const byteString = atob(image.split(',')[1]);
            const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
            const byteArray = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
              byteArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: mimeString });
            const file = new File([blob], `image_${index}.jpg`, { type: mimeString });
            this.uploadedFiles.push(file);
          });

          this.editProductForm.get('uploadedFiles')?.setValue(this.uploadedFiles);
          this.editProductForm.get('uploadedFiles')?.updateValueAndValidity();
        }
      },
      error: (err) => {
        console.error('Failed to fetch product details:', err);
        this.router.navigate(['']);
      }
    });
  }

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const files = control.value as File[];
      return (files && files.length > 0) ? null : { minImages: true };
    };
  }

  edit(): void {
    if (this.editProductForm.valid) {
      const formValues = this.editProductForm.value;
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
  
      this.editProductForm.value.eventTypes!.forEach((eventType: string | Blob) => {
        formData.append('eventTypes', eventType);
      });
  
      this.uploadedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });

      this.productManagerService.updateProduct(formData, this.productId).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error creating product:', err),
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    Array.from(input.files || []).forEach(file => {
      this.uploadedFiles.push(file);
    });
    this.editProductForm.get('uploadedFiles')?.setValue(this.uploadedFiles);
    this.editProductForm.get('uploadedFiles')?.updateValueAndValidity();
  }

  removeImage(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.editProductForm.get('uploadedFiles')?.setValue(this.uploadedFiles);
    this.editProductForm.get('uploadedFiles')?.updateValueAndValidity();
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

  timeFormat(time: string): string {
    let [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  onLocationSelected(selectedLocation: any): void {
    this.editProductForm.get('location')?.setValue(selectedLocation.displayName);

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
