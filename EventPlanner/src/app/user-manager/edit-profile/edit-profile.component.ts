import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  id: number = 0;
  editProfileForm: FormGroup;

  categoriesList: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  eventTypesList: string[] = ['Event Type 1', 'Event Type 2', 'Event Type 3', 'Event Type 4'];

  profilePhoto: string | null = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
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
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required, this.matchPasswordValidator.bind(this)]),
      role: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadUserData();
    });
  }

  loadUserData() {
    this.userService.getById(this.id).subscribe((user) => {
      if (user) {
        this.editProfileForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          address: user.address,
          phoneNumber: user.phoneNumber,
          description: user.description,
          categories: user.categories,
          eventTypes: user.eventTypes,
          profilePhoto: user.profilePhoto,
          role: user.role
        });
      } else {
        console.error(`User with ID ${this.id} not found.`);
      }
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

  matchPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.editProfileForm && this.editProfileForm.controls['newPassword'] && control.value !== this.editProfileForm.controls['newPassword'].value) {
      return { notMatching: true };
    }
    return null;
  }

  edit(): boolean {
    if (this.editProfileForm.valid) {
      return true;
    }
    return false;
  }

  submit(formDirective: FormGroupDirective): void {
    this.editProfileForm.markAllAsTouched();

    if (this.editProfileForm.value.role === 'Event Organizer') {
      this.editProfileForm.get('companyName')?.setErrors(null);
      this.editProfileForm.get('description')?.setErrors(null);
      this.editProfileForm.get('categories')?.setErrors(null);
      this.editProfileForm.get('eventTypes')?.setErrors(null);
    } 
    else {
      this.editProfileForm.markAllAsTouched();
    }
  
    let successfull: boolean = this.edit();
    if (successfull) {
      formDirective.resetForm();
      this.editProfileForm.reset({
        role: 'Event Organizer'
      });
    }
  }
}
