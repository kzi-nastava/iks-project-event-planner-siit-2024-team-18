import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBudgetItemComponent } from './edit-budget-item.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditBudgetItemComponent', () => {
  let component: EditBudgetItemComponent;
  let fixture: ComponentFixture<EditBudgetItemComponent>;

  beforeEach(async () => {
    const mockBudgetItem = {
      id: 1,
      maxAmount: 500,
      categoryName: 'Food'
    };

    await TestBed.configureTestingModule({
      declarations: [EditBudgetItemComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { budgetItem: mockBudgetItem } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
