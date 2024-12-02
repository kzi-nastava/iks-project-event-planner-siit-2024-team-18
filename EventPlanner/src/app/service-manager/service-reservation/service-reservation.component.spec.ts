import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReservationComponent } from './service-reservation.component';

describe('ServiceReservationComponent', () => {
  let component: ServiceReservationComponent;
  let fixture: ComponentFixture<ServiceReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
