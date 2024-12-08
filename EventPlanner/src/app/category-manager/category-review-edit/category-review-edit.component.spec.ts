import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryReviewEditComponent } from './category-review-edit.component';

describe('CategoryReviewEditComponent', () => {
  let component: CategoryReviewEditComponent;
  let fixture: ComponentFixture<CategoryReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryReviewEditComponent]
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
