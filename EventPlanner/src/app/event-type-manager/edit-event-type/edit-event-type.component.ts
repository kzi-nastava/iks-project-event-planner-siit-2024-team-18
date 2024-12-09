import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../models/event-type.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category-service.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  eventType: EventType;
  editEventTypeForm: FormGroup;

  categoriesList: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditEventTypeComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: EventType }
  ) {
    this.editEventTypeForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      categories: new FormControl([], [Validators.required]),
    });

    this.eventType = { ...data.eventType };
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadFormData();
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

  loadFormData(): void {
    this.editEventTypeForm.patchValue({
      name: this.eventType.name,
      description: this.eventType.description,
      categories: this.eventType.categories
    });
  }

  update(): void {
    if (this.editEventTypeForm.valid) {
      const formValues = this.editEventTypeForm.value;

      this.eventType = {
        ...this.eventType,
        description: formValues.description,
        categories: formValues.categories,
      };

      this.dialogRef.close(this.eventType);
    } else {
      console.error('Form is invalid!');
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}