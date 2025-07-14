import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCardComponent } from './event-card.component';
import { EventCard } from '../../models/event-card.model';

describe('EventCardComponent', () => {
    let component: EventCardComponent;
    let fixture: ComponentFixture<EventCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EventCardComponent);
        component = fixture.componentInstance;

        const mockEvent: EventCard = {
            id: 1,
            name: 'Test Event',
            description: 'This is a test event description',
            locationName: 'Test Location',
            cardImage: 'path/to/image.jpg',
            startDate: new Date(Date.now()),
        };

        component.event = mockEvent;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
