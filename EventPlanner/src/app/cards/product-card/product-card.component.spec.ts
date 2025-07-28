import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { SolutionCard } from '../../models/solution-card.model';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    const mockProduct: SolutionCard = {
      id: 1,
      name: 'Test Product',
      description: 'Test product description',
      price: 100,
      discount: 10,
      locationName: 'Test Location',
      isAvailable: true,
      cardImage: 'path/to/image.jpg',
      solutionType: 'Test Type'
    };

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
