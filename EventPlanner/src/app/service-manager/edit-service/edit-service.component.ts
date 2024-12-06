import { Component, OnInit } from '@angular/core';
import { ServiceManagerService } from '../../services/service-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from '../../models/service.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  serviceId: number = 0;
  editServiceForm: FormGroup;

  selectedImages: string[] = [];
  categories: string[] = ['Photography', 'Catering', 'Decorations', 'DJ Services', 'Lighting Setup', 'Flower Arrangements', 'Videography'];
  filteredCategories: string[] = this.categories.slice();
  eventTypes: string[] = ['Wedding', 'Birthday', 'Corporate', 'Party', 'Festival'];
  filteredEventTypes: string[] = this.eventTypes.slice();

  constructor(
    private serviceManagerService: ServiceManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editServiceForm = new FormGroup({
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
      isAvailable: new FormControl(false),
      isVisible: new FormControl(false),
      duration: new FormControl(15, [Validators.required]),
      engagement: new FormControl([1, 2], null), // TODO: fix this
      reservationType: new FormControl('auto', [Validators.required]),
      selectedImages: new FormControl([], this.minImagesValidator()),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['id'];
      this.loadServiceData();
    });
  }

  loadServiceData(): void {
    const service = this.serviceManagerService.getServiceByIdStatic(this.serviceId);
    if (service) {
      this.editServiceForm.patchValue({
        name: service.name,
        description: service.description,
        price: service.price,
        discount: service.discount,
        isVisible: service.isVisible,
        isAvailable: service.isAvailable,
        isDeleted: service.isDeleted,

        reservationType: service.reservationType,
        specifics: service.description,
        minDuration: 0,
        maxDuration: 0,
        reservationDeadline: 0,
        cancellationDeadline: 0,
        
        // category: service.category,
        // eventType: service.eventType,
        // reservationDate: service.reservationDate.toISOString().split('T')[0],
        // reservationTime: service.reservationTime,
        // cancellationDate: service.cancellationDate.toISOString().split('T')[0],
        // duration: service.duration,
        // engagement: service.engagement,
      });

      this.selectedImages = service.images;
    }
  }

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
  }

  edit(): void {
    if (this.editServiceForm.valid) {
      const service: Service = {
        id: Math.random(),
        name: this.editServiceForm.value.title!,
        description: this.editServiceForm.value.description!,
        price: this.editServiceForm.value.price!,
        discount: this.editServiceForm.value.discount || 0,
        images: this.selectedImages,
        isVisible: this.editServiceForm.value.isVisible!,
        isAvailable: this.editServiceForm.value.isAvailable!,
        isDeleted: false,
        reservationType: this.editServiceForm.value.reservationType as 'auto' | 'manual',
        
        specifics: this.editServiceForm.value.specifics || '',
        minDuration: 0,
        maxDuration: 0,
        reservationDeadline: 0,
        cancellationDeadline: 0,
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
