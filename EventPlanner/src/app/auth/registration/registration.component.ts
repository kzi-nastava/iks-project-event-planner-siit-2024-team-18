import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  selectedRole: string = 'Event Organizer';

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  companyName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]);
  description = new FormControl('', [Validators.required]);

  categories = new FormControl([], [Validators.required]);
  categoriesList: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  eventTypes = new FormControl([], [Validators.required]);
  eventTypesList: string[] = ['Event Type 1', 'Event Type 2', 'Event Type 3', 'Event Type 4'];

  profilePhoto: string | null = null;

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
      };

      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.profilePhoto = null;
  }
  
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required, this.matchPasswordValidator.bind(this)]);

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
    if (this.password && control.value !== this.password.value) {
      return { notMatching: true };
    }
    return null;
  }

  submit(): void {
    this.email.markAsTouched();
    this.firstName.markAsTouched();
    this.lastName.markAsTouched();
    this.companyName.markAsTouched();
    this.address.markAsTouched();
    this.phoneNumber.markAsTouched();
    this.description.markAsTouched();
    this.categories.markAsTouched();
    this.eventTypes.markAsTouched();
    this.password.markAsTouched();
    this.confirmPassword.markAsTouched();
  }
}
