import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFiltersComponent } from './service-filters.component';

describe('ServiceFiltersComponent', () => {
  let component: ServiceFiltersComponent;
  let fixture: ComponentFixture<ServiceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
