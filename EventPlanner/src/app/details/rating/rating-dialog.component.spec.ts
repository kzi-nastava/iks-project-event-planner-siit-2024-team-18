import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDialogComponent } from './rating-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ProductManagerService } from '../../services/product-manager.service';
import { ServiceManagerService } from '../../services/service-manager.service';

describe('RatingDialogComponent', () => {
    let component: RatingDialogComponent;
    let fixture: ComponentFixture<RatingDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RatingDialogComponent],
            providers: [
                ProductManagerService,
                ServiceManagerService,
                EventService,
                {
                    provide: MatDialogRef,
                    useValue: { close: jasmine.createSpy('close') },
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        product: {
                            id: 1,
                            name: 'Test Product',
                            price: 100,
                            description: 'Test',
                            image: '',
                        },
                        service: {
                            id: 1,
                            name: 'Test Service',
                            description: 'Test service',
                        },
                    },
                },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(RatingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
