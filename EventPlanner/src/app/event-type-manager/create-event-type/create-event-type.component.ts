import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypeService } from '../../services/event-type.service';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.css'
})
export class CreateEventTypeComponent {
  createEventTypeForm: FormGroup;

  categoriesList: string[] = ['Photography', 'Catering', 'Sound System', 'Venue', 'Lightning'];

  constructor(private eventTypeService: EventTypeService, private router: Router) {
    this.createEventTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
    });
  }
}
