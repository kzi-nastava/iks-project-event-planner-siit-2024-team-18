import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import { SolutionCard } from '../../models/solution-card.model';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;

    const mockService: SolutionCard = {
      id: 1,
      name: 'Test Service',
      description: 'Test service description',
      price: 100,
      discount: 10,
      locationName: 'Test Location',
      isAvailable: true,
      cardImage: 'path/to/image.jpg',
      solutionType: 'Test Type'
    };

    component.service = mockService;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
