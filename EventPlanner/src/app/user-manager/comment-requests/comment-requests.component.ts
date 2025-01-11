import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommentRequest } from '../../models/comment-request.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-requests',
  templateUrl: './comment-requests.component.html',
  styleUrls: ['./comment-requests.component.css']
})
export class CommentRequestsComponent implements OnInit {
  comments: CommentRequest[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentService.getPendingComments().subscribe({
      next: (data: CommentRequest[]) => {
        this.comments = data;
      },
      error: (error) => {
        console.error('Failed to fetch comments:', error);
      }
    });
  }

  handleApproveComment(commentId: number): void {
    this.commentService.approveComment(commentId).subscribe({
      next: (data: Comment) => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error: (error) => {
        console.error('Failed to approve comment:', error);
      }
    });
  }

  handleRemoveComment(commentId: number): void {
    this.commentService.removeComment(commentId).subscribe({
      next: (data: Comment) => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error: (error) => {
        console.error('Failed to remove comment:', error);
      }
    });
  }
}
