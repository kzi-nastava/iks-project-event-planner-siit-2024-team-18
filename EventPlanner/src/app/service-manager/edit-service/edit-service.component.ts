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

  images: string[] = [];
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
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['id'];
      this.loadServiceData();
    });
  }

  loadServiceData(): void {
    this.serviceManagerService.getServiceById(this.serviceId).subscribe({
      next: (data: Service) => {
        const service = data;
        if (service) {
          this.editServiceForm.patchValue({
            name: service.name,
            description: service.description,
            price: service.price,
            discount: service.discount,
            isVisible: service.isVisible,
            isAvailable: service.isAvailable,
            category: "Photography",
            eventTypes: ["Wedding"],
            location: 'Serbia',
            creator: 'Mare',
            isDeleted: service.isDeleted,
            status: 'ACCPETED',
            reservationType: service.reservationType,

            specifics: service.specifics!,
            duration: service.duration!,
            minEngagement: service.minEngagement!,
            maxEngagement: service.maxEngagement!,
            reservationDeadline: service.reservationDeadline!,
            cancellationDeadline: service.cancellationDeadline!,
          });
          this.images = service.images;
    
        }
      },
      error: (err) => {
        console.error('Failed to fetch service details:', err);
        this.router.navigate(['']);
      }
    });
  }

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
  }

  edit(): void {
    if (this.editServiceForm.valid) {
      const service: Service = {
        id: this.serviceId,
        name: this.editServiceForm.value.name!,
        description: this.editServiceForm.value.description!,
        price: this.editServiceForm.value.price!,
        discount: this.editServiceForm.value.discount || 0,
        images: this.images,
        isVisible: this.editServiceForm.value.isVisible!,
        isAvailable: this.editServiceForm.value.isAvailable!,
        category: this.editServiceForm.value.category!,
        eventTypes: this.editServiceForm.value.eventTypes!,
        location: 'Serbia',
        creator: 'Mare',
        isDeleted: false,
        status: 'PENDING',
        reservationType: this.editServiceForm.value.reservationType as 'AUTOMATIC' | 'MANUAL',
        
        specifics: this.editServiceForm.value.specifics!,
        duration: this.editServiceForm.value.duration!,
        minEngagement: this.editServiceForm.value.minEngagement!,
        maxEngagement: this.editServiceForm.value.maxEngagement!,
        reservationDeadline: this.editServiceForm.value.reservationDeadline!,
        cancellationDeadline: this.editServiceForm.value.cancellationDeadline!,
        };
        this.route.params.subscribe((params) => {
          this.serviceManagerService
            .updateService(service, +params['id'])
            .subscribe(((res: any) => {
              this.router.navigate(['/services']);
          }));
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
