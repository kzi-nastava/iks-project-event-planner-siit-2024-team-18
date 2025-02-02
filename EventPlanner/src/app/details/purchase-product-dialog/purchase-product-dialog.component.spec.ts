import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProductDialogComponent } from './purchase-product-dialog.component';
import { EventService } from '../../services/event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PurchaseProductDialogComponent', () => {
  let component: PurchaseProductDialogComponent;
  let fixture: ComponentFixture<PurchaseProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseProductDialogComponent],
      providers: [
                    { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
                    { provide: MAT_DIALOG_DATA, useValue: {} },
                    EventService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
                  schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
