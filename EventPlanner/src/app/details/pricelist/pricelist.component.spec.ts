import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistComponent } from './pricelist.component';
import { ServiceManagerService } from '../../services/service-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('PricelistComponent', () => {
  let component: PricelistComponent;
  let fixture: ComponentFixture<PricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule
                ],
      declarations: [PricelistComponent],
      providers: [
                    ServiceManagerService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
