import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentRequestCardComponent } from './comment-request-card.component';
import { CommentRequest } from '../../models/comment-request.model';

describe('CommentRequestCardComponent', () => {
  let component: CommentRequestCardComponent;
  let fixture: ComponentFixture<CommentRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentRequestCardComponent);
    component = fixture.componentInstance;

    const mockCommentRequest: CommentRequest = {
      id: 1,
      content: 'Test content',
      date: new Date(),
      status: 'Pending'
    };

    component.commentRequest = mockCommentRequest;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
