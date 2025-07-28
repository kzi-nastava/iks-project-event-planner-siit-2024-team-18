import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryReviewEditComponent } from './category-review-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from '../../services/category-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryReviewEditComponent', () => {
  let component: CategoryReviewEditComponent;
  let fixture: ComponentFixture<CategoryReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryReviewEditComponent],
      providers: [
              { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
              { provide: MAT_DIALOG_DATA, useValue: {} },
              CategoryService,
              provideHttpClient(),
              provideHttpClientTesting(),
            ],
            schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
