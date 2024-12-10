import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
  id: number = 0;

  editEventForm: FormGroup;

  eventTypesList: string[] = ['All', 'Wedding', 'Birthday', 'Conference', 'Sports Event', 'Exhibition'];
  selectedImages: string[] = [];

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    this.editEventForm = new FormGroup({
      eventTypes: new FormControl({ value: '', disabled: true }, [Validators.required]),
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      maxParticipants: new FormControl('', [Validators.required, Validators.min(1)]),
      privacyType: new FormControl('Public', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      selectedImages: new FormControl([], this.minImagesValidator())
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEventData();
    });
  }

  loadEventData() {
    this.eventService.getById(this.id).subscribe((event) => {
      if (event) {
        this.editEventForm.patchValue({
          eventTypes: event.eventType,
          name: event.name,
          description: event.description,
          maxParticipants: event.maxParticipants,
          privacyType: event.privacyType,
          location: event.location,
          date: new Date(event.date),
          time: event.time,
        });

        // Set selected images in both form and local array
        this.selectedImages = event.images || [];
        this.editEventForm.get('selectedImages')?.setValue(this.selectedImages);
      }
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
