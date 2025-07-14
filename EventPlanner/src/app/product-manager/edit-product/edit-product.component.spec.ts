import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EditProductComponent } from './edit-product.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ProductManagerService } from '../../services/product-manager.service';

describe('EditProductComponent', () => {
    let component: EditProductComponent;
    let fixture: ComponentFixture<EditProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                MaterialModule,
                BrowserAnimationsModule,
            ],
            declarations: [EditProductComponent],
            providers: [
                ProductManagerService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
