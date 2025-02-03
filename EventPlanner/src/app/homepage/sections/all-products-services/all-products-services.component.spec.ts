import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsServicesComponent } from './all-products-services.component';
import { SolutionService } from '../../../services/solution.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../../infrastructure/material/material.module';

describe('AllProductsServicesComponent', () => {
  let component: AllProductsServicesComponent;
  let fixture: ComponentFixture<AllProductsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule
                ],
      declarations: [AllProductsServicesComponent],
      providers: [
                    SolutionService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
