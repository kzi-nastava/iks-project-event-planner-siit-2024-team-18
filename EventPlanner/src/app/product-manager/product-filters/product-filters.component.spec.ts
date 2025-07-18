import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFiltersComponent } from './product-filters.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { EventTypeService } from '../../services/event-type.service';
import { CategoryService } from '../../services/category-service.service';
import { of } from 'rxjs';

class MockEventTypeService {
    getAll() {
        return of([{ name: 'Wedding' }, { name: 'Birthday' }]);
    }
}
class MockCategoryService {
    getCategories() {
        return of([{ name: 'Music' }, { name: 'Catering' }]);
    }
}
class MockDialogRef {
    close = jasmine.createSpy('close');
}

describe('ProductFiltersComponent', () => {
    let component: ProductFiltersComponent;
    let fixture: ComponentFixture<ProductFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, MaterialModule],
            declarations: [ProductFiltersComponent],
            providers: [
                { provide: MatDialogRef, useClass: MockDialogRef },
                { provide: EventTypeService, useClass: MockEventTypeService },
                { provide: CategoryService, useClass: MockCategoryService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
