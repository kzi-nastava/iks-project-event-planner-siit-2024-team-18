import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetItemComponent } from './edit-budget-item.component';

describe('EditBudgetItemComponent', () => {
  let component: EditBudgetItemComponent;
  let fixture: ComponentFixture<EditBudgetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBudgetItemComponent]
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
