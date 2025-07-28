import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CategoryService } from '../../services/category-service.service';
import { Category } from '../../models/category.model';
import { EventTypeService } from '../../services/event-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;

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
        this.registrationForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            companyName: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[0-9]{9,10}$/),
            ]),
            description: new FormControl('', [Validators.required]),
            categories: new FormControl([], [Validators.required]),
            eventTypes: new FormControl([], [Validators.required]),
            profilePhoto: new FormControl(''),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [
                Validators.required,
                this.matchPasswordValidator.bind(this),
            ]),
            role: new FormControl('Event Organizer'),
        });
    }

    ngOnInit(): void {
        this.loadCategories();
        this.loadEventTypes();
    }

    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (data: Category[]) => {
                this.categoriesList = data.map(
                    (category: Category) => category.name
                );
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
        const fileInput = document.getElementById(
            'fileInput'
        ) as HTMLInputElement;
        fileInput?.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 200;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    this.profilePhoto = resizedBase64;
                    this.registrationForm.patchValue({
                        profilePhoto: resizedBase64,
                    });
                };
                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    removePhoto(): void {
        this.profilePhoto = null;
        this.registrationForm.patchValue({
            profilePhoto: '',
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

    matchPasswordValidator(
        control: FormControl
    ): { [key: string]: boolean } | null {
        if (
            this.registrationForm &&
            this.registrationForm.controls['password'] &&
            control.value !== this.registrationForm.controls['password'].value
        ) {
            return { notMatching: true };
        }
        return null;
    }

    registration(): void {
        if (this.registrationForm.valid) {
            const user: User = {
                id: 0,
                email: this.registrationForm.value.email,
                firstName: this.registrationForm.value.firstName,
                lastName: this.registrationForm.value.lastName,
                companyName: this.registrationForm.value.companyName,
                address: this.registrationForm.value.address,
                phone: this.registrationForm.value.phoneNumber,
                description: this.registrationForm.value.description,
                categories: this.registrationForm.value.categories,
                eventTypes: this.registrationForm.value.eventTypes,
                image: this.registrationForm.value.profilePhoto ?? '',
                role: this.registrationForm.value.role,
                password: this.registrationForm.value.password,
            };

            if (this.registrationForm.value.role === 'Event Organizer') {
                this.userService.eventOrganizerRegistration(user).subscribe({
                    next: () => {
                        this.router.navigate(['/login']);
                        this.snackBar.open(
                            'A registration confirmation email has been sent to your email address. You can confirm the registration in the next 24 hours after which it is not possible to confirm the registration.',
                            'OK',
                            {
                                duration: 5000,
                            }
                        );
                    },
                    error: (err) => {
                        if (err.status === 400) {
                            this.snackBar.open(
                                'User with email ' +
                                    this.registrationForm.value.email +
                                    ' already exist.',
                                'OK'
                            );
                        } else {
                            console.error('Error creating user:', err);
                            this.snackBar.open(
                                'An unexpected error occurred while creating user.',
                                'OK',
                                {
                                    duration: 3000,
                                }
                            );
                        }
                    },
                });
            } else {
                this.userService
                    .serviceProductProviderRegistration(user)
                    .subscribe({
                        next: () => {
                            this.router.navigate(['/login']);
                            this.snackBar.open(
                                'A registration confirmation email has been sent to your email address. You can confirm the registration in the next 24 hours after which it is not possible to confirm the registration.',
                                'OK',
                                {
                                    duration: 5000,
                                }
                            );
                        },
                        error: (err) => {
                            if (err.status === 400) {
                                this.snackBar.open(
                                    'User with email ' +
                                        this.registrationForm.value.email +
                                        ' already exist.',
                                    'OK'
                                );
                            } else {
                                console.error('Error creating user:', err);
                                this.snackBar.open(
                                    'An unexpected error occurred while creating user.',
                                    'OK',
                                    {
                                        duration: 3000,
                                    }
                                );
                            }
                        },
                    });
            }
        }
    }

    submit(): void {
        this.registrationForm.markAllAsTouched();

        if (this.registrationForm.value.role === 'Event Organizer') {
            this.registrationForm.get('companyName')?.setErrors(null);
            this.registrationForm.get('description')?.setErrors(null);
            this.registrationForm.get('categories')?.setErrors(null);
            this.registrationForm.get('eventTypes')?.setErrors(null);
        } else {
            this.registrationForm.markAllAsTouched();
        }

        this.registration();
    }
}
