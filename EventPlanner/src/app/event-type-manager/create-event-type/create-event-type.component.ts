import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../models/event-type.model';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category-service.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.css',
})
export class CreateEventTypeComponent implements OnInit {
  newEventType: EventType = {
    id: 0,
    name: '',
    description: '',
    categories: [],
  };

  createEventTypeForm: FormGroup;

  categoriesList: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateEventTypeComponent>,
    private categoryService: CategoryService
  ) {
    this.createEventTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadCategories();
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

  create(): void {
    if (this.createEventTypeForm.valid) {
      const formValues = this.createEventTypeForm.value;

      this.newEventType = {
        id: 0,
        name: formValues.name,
        description: formValues.description,
        categories: formValues.categories,
      };

      this.dialogRef.close(this.newEventType);
    } else {
      console.error('Form is invalid!');
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
