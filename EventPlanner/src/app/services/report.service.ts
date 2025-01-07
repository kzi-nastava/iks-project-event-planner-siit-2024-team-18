import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Report } from '../models/report.model';
import { ReportRequest } from '../models/report-request.model';
import { SuspensionDetails } from '../models/suspension-details.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.apiHost}/api/reports`, report);
  }

  getPendingReports(): Observable<ReportRequest[]> {
    return this.http.get<ReportRequest[]>(`${environment.apiHost}/api/reports`);
  }

  approveReport(reportId: number): Observable<Report> {
    return this.http.put<Report>(`${environment.apiHost}/api/reports/${reportId}/approve`, {});
  }

  removeReport(reportId: number): Observable<Report> {
    return this.http.put<Report>(`${environment.apiHost}/api/reports/${reportId}/remove`, {});
  }

  getSuspensionDetails(email: string): Observable<SuspensionDetails[]> {
    return this.http.get<SuspensionDetails[]>(`${environment.apiHost}/api/reports/suspensions/${email}`);
  }
}
