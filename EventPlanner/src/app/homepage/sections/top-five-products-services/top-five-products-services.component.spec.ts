import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveProductsServicesComponent } from './top-five-products-services.component';
import { SolutionService } from '../../../services/solution.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TopFiveProductsServicesComponent', () => {
  let component: TopFiveProductsServicesComponent;
  let fixture: ComponentFixture<TopFiveProductsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopFiveProductsServicesComponent],
      providers: [
                    SolutionService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFiveProductsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
