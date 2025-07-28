import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionDialogComponent } from './suspension-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuspensionDialogComponent', () => {
  let component: SuspensionDialogComponent;
  let fixture: ComponentFixture<SuspensionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspensionDialogComponent],
      providers: [
                    { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
                    { provide: MAT_DIALOG_DATA, useValue: {} }
                  ],
                  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
