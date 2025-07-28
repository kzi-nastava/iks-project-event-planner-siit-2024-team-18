import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRequestsComponent } from './comment-requests.component';
import { CommentService } from '../../services/comment.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CommentRequestsComponent', () => {
  let component: CommentRequestsComponent;
  let fixture: ComponentFixture<CommentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentRequestsComponent],
      providers: [
                    CommentService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
