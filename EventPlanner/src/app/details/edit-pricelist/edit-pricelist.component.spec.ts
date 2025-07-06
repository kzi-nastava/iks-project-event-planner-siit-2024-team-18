import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricelistComponent } from './edit-pricelist.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditPricelistComponent', () => {
  let component: EditPricelistComponent;
  let fixture: ComponentFixture<EditPricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPricelistComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
