import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationFormComponent } from './confirmation-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConfirmationFormComponent', () => {
  let component: ConfirmationFormComponent;
  let fixture: ComponentFixture<ConfirmationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationFormComponent],
      providers: [
                    { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
                    { provide: MAT_DIALOG_DATA, useValue: {} }
                  ],
                  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
