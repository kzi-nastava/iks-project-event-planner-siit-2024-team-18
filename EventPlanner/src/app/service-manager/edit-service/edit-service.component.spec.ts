import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceComponent } from './edit-service.component';
import { ServiceManagerService } from '../../services/service-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditServiceComponent', () => {
  let component: EditServiceComponent;
  let fixture: ComponentFixture<EditServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  RouterModule.forRoot([]),
                  MaterialModule,
                  BrowserAnimationsModule
                ],
      declarations: [EditServiceComponent],
      providers: [
                    ServiceManagerService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
