import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRequestCardComponent } from './comment-request-card.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
