import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentRequest } from '../../models/comment-request.model';

@Component({
  selector: 'app-comment-request-card',
  templateUrl: './comment-request-card.component.html',
  styleUrls: ['./comment-request-card.component.css'],
})
export class CommentRequestCardComponent {
  @Input() commentRequest!: CommentRequest;
  @Output() approve = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onApprove(): void {
    this.approve.emit(this.commentRequest.id);
  }

  onRemove(): void {
    this.remove.emit(this.commentRequest.id);
  }
}
