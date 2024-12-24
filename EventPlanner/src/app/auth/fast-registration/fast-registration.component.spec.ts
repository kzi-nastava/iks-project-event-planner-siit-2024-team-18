import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRegistrationComponent } from './fast-registration.component';

describe('FastRegistrationComponent', () => {
  let component: FastRegistrationComponent;
  let fixture: ComponentFixture<FastRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
