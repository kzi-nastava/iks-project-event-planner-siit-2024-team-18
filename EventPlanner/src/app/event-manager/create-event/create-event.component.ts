import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  createEventForm: FormGroup;

  eventTypesList: string[] = ['All', 'Wedding', 'Birthday', 'Conference', 'Sports Event', 'Exhibition'];
  selectedImages: string[] = [];

  constructor(private eventService: EventService, private router: Router) {
    this.createEventForm = new FormGroup({
      eventTypes: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      maxParticipants: new FormControl('', [Validators.required, Validators.min(1)]),
      privacyType: new FormControl('Public', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      selectedImages: new FormControl([], this.minImagesValidator())
    });
  }

  minImagesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return (control.value && control.value.length > 0) ? null : { minImages: true };
    };
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
}
