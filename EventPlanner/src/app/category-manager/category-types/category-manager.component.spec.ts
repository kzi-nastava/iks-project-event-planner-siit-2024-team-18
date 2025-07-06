import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagerComponent } from './category-manager.component';
import { CategoryService } from '../../services/category-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('CategoryManagerComponent', () => {
  let component: CategoryManagerComponent;
  let fixture: ComponentFixture<CategoryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
              RouterModule.forRoot([]),
              MaterialModule
            ],
      declarations: [CategoryManagerComponent],
      providers: [
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
