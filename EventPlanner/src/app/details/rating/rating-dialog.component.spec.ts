import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventService } from '../../services/event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RatingDialogComponent } from './rating-dialog.component';

describe('RatingDialogComponent', () => {
  let component: RatingDialogComponent;
  let fixture: ComponentFixture<RatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingDialogComponent],
      providers: [
                    { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
                    { provide: MAT_DIALOG_DATA, useValue: {} },
                    EventService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
                  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
