import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceComponent } from './create-service.component';
import { ServiceManagerService } from '../../services/service-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateServiceComponent', () => {
  let component: CreateServiceComponent;
  let fixture: ComponentFixture<CreateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  RouterModule.forRoot([]),
                  MaterialModule,
                  BrowserAnimationsModule
                ],
      declarations: [CreateServiceComponent],
      providers: [
                    ServiceManagerService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
