import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ReportRequest } from '../../models/report-request.model';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: ReportRequest[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.reportService.getPendingReports().subscribe({
      next: (data: ReportRequest[]) => {
        this.reports = data;
      },
      error: (error) => {
        console.error('Failed to fetch reports:', error);
      }
    });
  }

  handleApproveReport(reportId: number): void {
    this.reportService.approveReport(reportId).subscribe({
      next: (data: Report) => {
        this.reports = this.reports.filter(report => report.id !== reportId);
      },
      error: (error) => {
        console.error('Failed to approve report:', error);
      }
    });
  }

  handleRemoveReport(reportId: number): void {
    this.reportService.removeReport(reportId).subscribe({
      next: (data: Report) => {
        this.reports = this.reports.filter(report => report.id !== reportId);
      },
      error: (error) => {
        console.error('Failed to remove report:', error);
      }
    });
  }
}
