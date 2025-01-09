import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportRequest } from '../../models/report-request.model';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css'],
})
export class ReportCardComponent {
  @Input() report!: ReportRequest;
  @Output() approve = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onApprove(): void {
    this.approve.emit(this.report.id);
  }

  onRemove(): void {
    this.remove.emit(this.report.id);
  }
}
