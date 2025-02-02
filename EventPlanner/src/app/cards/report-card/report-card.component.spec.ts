import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportCardComponent } from './report-card.component';
import { ReportRequest } from '../../models/report-request.model';

describe('ReportCardComponent', () => {
  let component: ReportCardComponent;
  let fixture: ComponentFixture<ReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCardComponent);
    component = fixture.componentInstance;

    const mockReport: ReportRequest = {
      id: 1,
      description: 'Test Report',
      reporterFirstName: 'John',
      reportedFirstName: 'Jane',
      reporterLastName: 'Doe',
      reportedLastName: 'Smith',
      reportedDate: new Date('2025-02-01')
    };

    component.report = mockReport;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
