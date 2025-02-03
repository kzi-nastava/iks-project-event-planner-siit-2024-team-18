import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteFormComponent } from './delete-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with true when onConfirm is called', () => {
    component.onConfirm();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false when onCancel is called', () => {
    component.onCancel();
    expect(component.dialogRef.close).toHaveBeenCalledWith(false);
  });
});
