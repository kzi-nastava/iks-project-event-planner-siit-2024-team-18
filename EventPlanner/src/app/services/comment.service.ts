import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Comment } from '../models/comment.model';
import { CommentRequest } from '../models/comment-request.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getPendingComments(): Observable<CommentRequest[]> {
    return this.http.get<CommentRequest[]>(`${environment.apiHost}/api/comments`);
  }

  approveComment(commentId: number): Observable<Comment> {
    return this.http.put<Comment>(`${environment.apiHost}/api/comments/${commentId}/approve`, {});
  }

  removeComment(commentId: number): Observable<Comment> {
    return this.http.put<Comment>(`${environment.apiHost}/api/comments/${commentId}/remove`, {});
  }
}
