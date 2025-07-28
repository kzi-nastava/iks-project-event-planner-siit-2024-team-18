import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ProductManagerService } from '../../services/product-manager.service';
import { of } from 'rxjs';

@Component({ selector: 'app-search-bar', template: '' })
class StubSearchBarComponent {}

class MockProductManagerService {
    searchAndFilter() {
        return of({ content: [], totalElements: 0 });
    }
    deleteProduct() {
        return of(null);
    }
}
class MockDialog {
    open() {
        return { afterClosed: () => of(null) };
    }
}

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                MatPaginatorModule,
                BrowserAnimationsModule,
                MaterialModule,
            ],
            declarations: [
                ProductsComponent,
                StubSearchBarComponent, // ⬅️ stub replaces real one
            ],
            providers: [
                {
                    provide: ProductManagerService,
                    useClass: MockProductManagerService,
                },
                { provide: MatDialog, useClass: MockDialog },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
