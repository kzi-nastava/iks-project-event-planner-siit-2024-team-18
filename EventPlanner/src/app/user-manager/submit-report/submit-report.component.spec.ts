import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReportComponent } from './submit-report.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SubmitReportComponent', () => {
  let component: SubmitReportComponent;
  let fixture: ComponentFixture<SubmitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitReportComponent],
      providers: [
              { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
              { provide: MAT_DIALOG_DATA, useValue: {} },
              ReportService,
              provideHttpClient(),
              provideHttpClientTesting(),
            ],
            schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
