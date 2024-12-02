import { Component } from '@angular/core';
import { ServiceManagerService } from '../../services/service-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from '../../models/service.model';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  createServiceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specifics: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    reservationDate: new FormControl('', [Validators.required]),
    reservationTime: new FormControl('', [Validators.required]),
    cancellationDate: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    isPublic: new FormControl(false),
    isVisible: new FormControl(false),
    duration: new FormControl(15, [Validators.required, Validators.min(15), Validators.max(120)]),
    engagement: new FormControl([1, 2], [Validators.required, Validators.min(1), Validators.max(5)]),
    reservationType: new FormControl('auto', [Validators.required]),
    selectedImages: new FormControl([], this.minImagesValidator()),
  });

  selectedImages: string[] = [];
  categories: string[] = ['Photography Category', 'Catering Category', 'Music Category', 'Decorations Category', 'Venue Category'];
  filteredCategories: string[] = this.categories.slice();
  eventTypes: string[] = ['Photography Event', 'Catering Event', 'Music Event', 'Decorations Event', 'Venue Event'];
  filteredEventTypes: string[] = this.eventTypes.slice();

  constructor(private serviceManagerService: ServiceManagerService, private router: Router
  ) {}

  ngOnInit(): void {}

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
  }

  create() {
    if (this.createServiceForm.valid) {
      const service: Service = {
        _id: Math.random(),
        title: this.createServiceForm.value.title!,
        description: this.createServiceForm.value.description!,
        specifics: this.createServiceForm.value.specifics || '',
        images: this.selectedImages,
        category: this.createServiceForm.value.category!,
        eventType: this.createServiceForm.value.eventType!,
        reservationDate: new Date(this.createServiceForm.value.reservationDate!),
        reservationTime: this.createServiceForm.value.reservationTime!,
        cancellationDate: new Date(this.createServiceForm.value.cancellationDate!),
        price: this.createServiceForm.value.price!,
        discount: this.createServiceForm.value.discount || 0,
        isPublic: this.createServiceForm.value.isPublic!,
        isVisible: this.createServiceForm.value.isVisible!,
        duration: this.createServiceForm.value.duration!,
        engagement: this.createServiceForm.value.engagement!,
        reservationType: this.createServiceForm.value.reservationType as 'auto' | 'manual',
      };

      this.serviceManagerService.createService(service);
      this.router.navigate(['/services']);
    }
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

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
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
}
