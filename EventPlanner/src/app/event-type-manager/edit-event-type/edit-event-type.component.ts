import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTypeService } from '../../services/event-type.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  id: number = 0;
  editEventTypeForm: FormGroup;

  categoriesList: string[] = ['Photography', 'Catering', 'Sound System', 'Venue', 'Lightning'];

  constructor(private eventTypeService: EventTypeService, private router: Router, private route: ActivatedRoute) {
    this.editEventTypeForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEventTypeData();
    });
  }

  loadEventTypeData() {
    this.eventTypeService.getById(this.id).subscribe((eventType) => {
      if (eventType) {
        this.editEventTypeForm.patchValue({
          name: eventType.name,
          description: eventType.description,
          categories: eventType.categories,
        });
      } else {
        console.error(`Event Type with ID ${this.id} not found.`);
      }
    });
  }
}
