import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CategoryService } from '../../services/category-service.service';
import { Category } from '../../models/category.model';
import { EventTypeService } from '../../services/event-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fast-registration',
  templateUrl: './fast-registration.component.html',
  styleUrls: ['./fast-registration.component.css']
})
export class FastRegistrationComponent implements OnInit {
  fastRegistrationForm: FormGroup;

  categoriesList: string[] = [];
  eventTypesList: string[] = [];

  profilePhoto: string | null = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private eventTypeService: EventTypeService,
    private snackBar: MatSnackBar
  ) {
    this.fastRegistrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
      eventTypes: new FormControl([], [Validators.required]),
      profilePhoto: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.matchPasswordValidator.bind(this)]),
      role: new FormControl('Event Organizer')
    });
  }

  ngOnInit(): void {
      this.loadCategories();
      this.loadEventTypes();
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categoriesList = data.map((category: Category) => category.name);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
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

  onSelectPhoto(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePhoto = e.target.result;
        this.fastRegistrationForm.patchValue({
          profilePhoto: this.profilePhoto
        });
      };

      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.profilePhoto = null;
    this.fastRegistrationForm.patchValue({
      profilePhoto: ''
    });
  }

  passwordHidden = true;
  confirmPasswordHidden = true;

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.passwordHidden = !this.passwordHidden;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordHidden = !this.confirmPasswordHidden;
    }
  }

  matchPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.fastRegistrationForm && this.fastRegistrationForm.controls['password'] && control.value !== this.fastRegistrationForm.controls['password'].value) {
      return { notMatching: true };
    }
    return null;
  }

  registration(): void {
    if (this.fastRegistrationForm.valid) {
      const user: User = {
        id: 0,
        email: this.fastRegistrationForm.value.email,
        firstName: this.fastRegistrationForm.value.firstName,
        lastName: this.fastRegistrationForm.value.lastName,
        companyName: this.fastRegistrationForm.value.companyName,
        address: this.fastRegistrationForm.value.address,
        phone: this.fastRegistrationForm.value.phoneNumber,
        description: this.fastRegistrationForm.value.description,
        categories: this.fastRegistrationForm.value.categories,
        eventTypes: this.fastRegistrationForm.value.eventTypes,
        image: this.fastRegistrationForm.value.profilePhoto ?? '',
        role: this.fastRegistrationForm.value.role,
        password: this.fastRegistrationForm.value.password,
      };

      if (this.fastRegistrationForm.value.role === 'Event Organizer') {
        this.userService.fastEventOrganizerRegistration(user).subscribe({
          next: () => {
            this.router.navigate(['/login']);
            this.snackBar.open('Fast Registration successful. You can login as event organizer.', 'OK', {
              duration: 5000,
            });
          },
          error: (err) => {
            if (err.status === 400) {
              this.snackBar.open('User with email ' + this.fastRegistrationForm.value.email + ' does not exist or is not authenticated.', 'OK');
            } else {
              console.error('Error creating user:', err);
              this.snackBar.open('An unexpected error occurred while promoting user.', 'OK', {
                duration: 3000,
              });
            }
          },
        });
      } else {
        this.userService.fastServiceProductProviderRegistration(user).subscribe({
          next: () => {
            this.router.navigate(['/login']);
            this.snackBar.open('Fast Registration successful. You can login as service product provider.', 'OK', {
              duration: 5000,
            });
          },
          error: (err) => {
            if (err.status === 400) {
              this.snackBar.open('User with email ' + this.fastRegistrationForm.value.email + ' does not exist or is not authenticated.', 'OK');
            } else {
              console.error('Error creating user:', err);
              this.snackBar.open('An unexpected error occurred while promoting user.', 'OK', {
                duration: 3000,
              });
            }
          },
        });
      }
    }
  }

  submit(): void {
    this.fastRegistrationForm.markAllAsTouched();

    if (this.fastRegistrationForm.value.role === 'Event Organizer') {
      this.fastRegistrationForm.get('companyName')?.setErrors(null);
      this.fastRegistrationForm.get('description')?.setErrors(null);
      this.fastRegistrationForm.get('categories')?.setErrors(null);
      this.fastRegistrationForm.get('eventTypes')?.setErrors(null);
    } 
    else {
      this.fastRegistrationForm.markAllAsTouched();
    }
  
    this.registration();
  }
}
