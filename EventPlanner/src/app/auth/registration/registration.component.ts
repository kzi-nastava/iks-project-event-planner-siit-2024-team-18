import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  categoriesList: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  eventTypesList: string[] = ['Event Type 1', 'Event Type 2', 'Event Type 3', 'Event Type 4'];

  profilePhoto: string | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.registrationForm = new FormGroup({
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
        this.registrationForm.patchValue({
          profilePhoto: this.profilePhoto
        });
      };

      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.profilePhoto = null;
    this.registrationForm.patchValue({
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
    if (this.registrationForm && this.registrationForm.controls['password'] && control.value !== this.registrationForm.controls['password'].value) {
      return { notMatching: true };
    }
    return null;
  }

  registration(): boolean {
    if (this.registrationForm.valid) {
      const user: User = {
        _id: Math.random(),
        email: this.registrationForm.value.email,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        companyName: this.registrationForm.value.companyName,
        address: this.registrationForm.value.address,
        phoneNumber: this.registrationForm.value.phoneNumber,
        description: this.registrationForm.value.description,
        categories: this.registrationForm.value.categories,
        eventTypes: this.registrationForm.value.eventTypes,
        profilePhoto: this.registrationForm.value.profilePhoto ?? '',
        role: this.registrationForm.value.role,
        password: this.registrationForm.value.password,
      };

      this.userService.signup(user);
      alert('Successful registration');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  submit(formDirective: FormGroupDirective): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.value.role === 'Event Organizer') {
      this.registrationForm.get('companyName')?.setErrors(null);
      this.registrationForm.get('description')?.setErrors(null);
      this.registrationForm.get('categories')?.setErrors(null);
      this.registrationForm.get('eventTypes')?.setErrors(null);
    } 
    else {
      this.registrationForm.markAllAsTouched();
    }
  
    let successfull: boolean = this.registration();
    if (successfull) {
      formDirective.resetForm();
      this.registrationForm.reset({
        role: 'Event Organizer'
      });
    }
  }
}
