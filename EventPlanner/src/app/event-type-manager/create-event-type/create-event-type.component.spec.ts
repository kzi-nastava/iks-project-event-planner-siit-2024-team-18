import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventTypeComponent } from './create-event-type.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from '../../services/category-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CreateEventTypeComponent', () => {
  let component: CreateEventTypeComponent;
  let fixture: ComponentFixture<CreateEventTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEventTypeComponent],
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

    fixture = TestBed.createComponent(CreateEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
