import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CategoryService } from '../../services/category-service.service';
import { EventTypeService } from '../../services/event-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { UpdateUser } from '../../models/update-user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  user: UpdateUser = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    companyName: '',
    image: '',
    address: '',
    phone: '',
    description: '',
    categories: [],
    eventTypes: [],
    oldPassword: '',
    newPassword: ''
  }

  categoriesList: string[] = [];
  eventTypesList: string[] = [];

  profilePhoto: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private categoryService: CategoryService,
    private eventTypeService: EventTypeService,
    private snackBar: MatSnackBar
  ) {
    this.editProfileForm = new FormGroup({
      email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
      eventTypes: new FormControl([], [Validators.required]),
      profilePhoto: new FormControl(''),
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('', [
        (control: AbstractControl) => this.matchPasswordValidator(control)
      ]),
      role: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadEventTypes();
    this.userService.getLoggedUser().subscribe((user) => {
      this.user.id = user.id;
      this.user.email = user.email;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.role = user.role;
      this.user.companyName = user.companyName;
      this.user.image = user.image;
      this.user.address = user.address;
      this.user.phone = user.phone;
      this.user.description = user.description;
      this.user.categories = user.categories;
      this.user.eventTypes = user.eventTypes

      this.editProfileForm.patchValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName,
        address: user.address,
        phoneNumber: user.phone,
        description: user.description,
        categories: user.categories,
        eventTypes: user.eventTypes,
        profilePhoto: user.image,
        role: user.role
      });
      this.profilePhoto = user.image!;
    });
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
        this.editProfileForm.patchValue({
          profilePhoto: this.profilePhoto
        });
      };

      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.profilePhoto = null;
    this.editProfileForm.patchValue({
      profilePhoto: ''
    });
  }

  oldPasswordHidden = true;
  newPasswordHidden = true;
  confirmNewPasswordHidden = true;

  togglePasswordVisibility(field: 'newPassword' | 'confirmNewPassword' | 'oldPassword'): void {
    if (field === 'newPassword') {
      this.newPasswordHidden = !this.newPasswordHidden;
    } else if (field === 'confirmNewPassword') {
      this.confirmNewPasswordHidden = !this.confirmNewPasswordHidden;
    } else if (field === 'oldPassword') {
      this.oldPasswordHidden = !this.oldPasswordHidden;
    }
  }

  matchPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.editProfileForm && this.editProfileForm.controls['newPassword'] && control.value !== this.editProfileForm.controls['newPassword'].value) {
      return { notMatching: true };
    }
    return null;
  }

  edit(): void {
    if (this.editProfileForm.valid) {
      const user: UpdateUser = {
        id: 0,
        email: this.editProfileForm.value.email,
        firstName: this.editProfileForm.value.firstName,
        lastName: this.editProfileForm.value.lastName,
        companyName: this.editProfileForm.value.companyName,
        address: this.editProfileForm.value.address,
        phone: this.editProfileForm.value.phoneNumber,
        description: this.editProfileForm.value.description,
        categories: this.editProfileForm.value.categories,
        eventTypes: this.editProfileForm.value.eventTypes,
        image: this.editProfileForm.value.profilePhoto ?? '',
        role: this.editProfileForm.value.role,
        oldPassword: this.editProfileForm.value.oldPassword,
        newPassword: this.editProfileForm.value.newPassword
      };

      this.userService.update(user).subscribe({
        next: () => {
          this.router.navigate(['/users/profile']);
          this.snackBar.open('You have successfuly updated your profile data.', 'OK', {
            duration: 3000,
          });
        },
        error: (err) => {
          if (err.status === 400) {
            this.snackBar.open('Old password is incorrect.', 'OK');
          } else {
            console.error('Error updating user:', err);
            this.snackBar.open('An unexpected error occurred while updating user.', 'OK', {
              duration: 3000,
            });
          }
        },
      });
      
    }
  }

  submit(): void {
    this.editProfileForm.markAllAsTouched();

    if (this.editProfileForm.value.role != 'SERVICE_PRODUCT_PROVIDER') {
      this.editProfileForm.get('companyName')?.setErrors(null);
      this.editProfileForm.get('description')?.setErrors(null);
      this.editProfileForm.get('categories')?.setErrors(null);
      this.editProfileForm.get('eventTypes')?.setErrors(null);
    } 
    else {
      this.editProfileForm.markAllAsTouched();
    }

    const oldPassword = this.editProfileForm.value.oldPassword;
    const newPassword = this.editProfileForm.value.newPassword;
    const confirmNewPassword = this.editProfileForm.value.confirmNewPassword;

    this.editProfileForm.get('oldPassword')?.setErrors(null);
    this.editProfileForm.get('newPassword')?.setErrors(null);
    this.editProfileForm.get('confirmNewPassword')?.setErrors(null);

    if (oldPassword) {
        if (!newPassword || !confirmNewPassword) {
            if (!newPassword) {
                this.editProfileForm.get('newPassword')?.setErrors({ required: true });
            }
            if (!confirmNewPassword) {
                this.editProfileForm.get('confirmNewPassword')?.setErrors({ required: true });
            }
        } else if (newPassword !== confirmNewPassword) {
            this.editProfileForm.get('confirmNewPassword')?.setErrors({ notMatching: true });
        }
    } else if (newPassword || confirmNewPassword) {
        if (!oldPassword) {
            this.editProfileForm.get('oldPassword')?.setErrors({ required: true });
        }
        if (newPassword !== confirmNewPassword) {
            this.editProfileForm.get('confirmNewPassword')?.setErrors({ notMatching: true });
        }
    }
  
    this.edit();
  }
}
