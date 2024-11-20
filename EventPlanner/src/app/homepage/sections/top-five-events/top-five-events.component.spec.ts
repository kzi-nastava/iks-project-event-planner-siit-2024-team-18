import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveEventsComponent } from './top-five-events.component';

describe('TopFiveEventsComponent', () => {
  let component: TopFiveEventsComponent;
  let fixture: ComponentFixture<TopFiveEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopFiveEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
