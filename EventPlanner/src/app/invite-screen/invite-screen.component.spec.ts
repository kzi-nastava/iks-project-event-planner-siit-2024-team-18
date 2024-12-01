import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteScreenComponent } from './invite-screen.component';

describe('InviteScreenComponent', () => {
  let component: InviteScreenComponent;
  let fixture: ComponentFixture<InviteScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
