import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCardComponent } from './notification-card.component';
import { NotificationCard } from '../../models/notification-card.model';

describe('NotificationCardComponent', () => {
  let component: NotificationCardComponent;
  let fixture: ComponentFixture<NotificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationCardComponent);
    component = fixture.componentInstance;

    const mockNotification: NotificationCard = {
      id: 1,
      title: 'Test Notification',
      content: 'This is a test notification.',
      date: '2025-02-01',
      seen: false,
      itemId: 123,
      notificationType: 'Test Type'
    };

    component.notification = mockNotification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
