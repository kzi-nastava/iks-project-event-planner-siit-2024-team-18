import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryReviewComponent } from './category-review.component';
import { CategoryService } from '../../services/category-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('CategoryReviewComponent', () => {
  let component: CategoryReviewComponent;
  let fixture: ComponentFixture<CategoryReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule
                ],
      declarations: [CategoryReviewComponent],
      providers: [
                    CategoryService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
