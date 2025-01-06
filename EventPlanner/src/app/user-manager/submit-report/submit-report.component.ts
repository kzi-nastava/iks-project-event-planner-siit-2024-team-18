import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.css']
})
export class SubmitReportComponent {
  reportReason: string = '';

  constructor(
    private dialogRef: MatDialogRef<SubmitReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; userName: string },
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitReport(): void {
    if (this.reportReason.trim()) {
      const report: Report = {
        description: this.reportReason,
        reportedId: this.data.userId,
        id: 0,
        reportedDate: undefined,
        status: '',
        reporterId: 0
      };

      this.reportService.createReport(report).subscribe({
        next: () => {
          this.snackBar.open('Report submitted successfully!', 'OK', { duration: 3000 });
          this.dialogRef.close();
        },
        error: () => {
          this.snackBar.open('Failed to submit report. Please try again.', 'OK', { duration: 3000 });
        }
      });
    }
  }
}
