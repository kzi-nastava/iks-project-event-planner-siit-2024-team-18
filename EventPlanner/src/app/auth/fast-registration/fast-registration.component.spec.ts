import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRegistrationComponent } from './fast-registration.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('FastRegistrationComponent', () => {
  let component: FastRegistrationComponent;
  let fixture: ComponentFixture<FastRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule,
                  BrowserAnimationsModule
                ],
      declarations: [FastRegistrationComponent],
      providers: [
                    UserService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
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
