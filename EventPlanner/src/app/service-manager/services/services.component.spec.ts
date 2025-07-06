import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesComponent } from './services.component';
import { ServiceManagerService } from '../../services/service-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  RouterModule.forRoot([]),
                  SharedModule,
                  MaterialModule,
                  BrowserAnimationsModule
                ],
      declarations: [ServicesComponent],
      providers: [
                    ServiceManagerService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
