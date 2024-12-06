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
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    images: new FormControl([], this.minImagesValidator()),
    isVisible: new FormControl(false),
    isAvailable: new FormControl(false),
    category: new FormControl('', [Validators.required]),
    eventTypes: new FormControl([], [Validators.required]),
    reservationType: new FormControl('AUTOMATIC', [Validators.required]),

    specifics: new FormControl('', [Validators.required]),
    duration: new FormControl(15, [Validators.min(15), Validators.max(120)]),
    minEngagement: new FormControl(1, [Validators.min(1), Validators.max(5)]),
    maxEngagement: new FormControl(1, [Validators.min(1), Validators.max(5)]),
    reservationDeadline: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    cancellationDeadline: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
  });

  images: string[] = [];
  categories: string[] = ['Photography Category', 'Catering Category', 'Music Category', 'Decorations Category', 'Venue Category'];
  filteredCategories: string[] = this.categories.slice();
  eventTypes: string[] = ['Photography Event', 'Catering Event', 'Music Event', 'Decorations Event', 'Venue Event'];
  filteredEventTypes: string[] = this.eventTypes.slice();

  constructor(private serviceManagerService: ServiceManagerService, private router: Router
  ) {}

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
  }

  create() {
    console.log(this.createServiceForm);

    if (this.createServiceForm.valid) {
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
        location: 'Serbia',
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
      };

      this.serviceManagerService
        .createService(service)
        .subscribe((res: any) => {
          this.router.navigate(['/services']);
        });
    }
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
}
