import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { CreateServiceComponent } from './create-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceManagerService } from '../../services/service-manager.service';
import { LocationService } from '../../services/location.service';
import { EventTypeService } from '../../services/event-type.service';
import { CategoryService } from '../../services/category-service.service';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateServiceComponent', () => {
    let component: CreateServiceComponent;
    let fixture: ComponentFixture<CreateServiceComponent>;
    let mockServiceManagerService: jasmine.SpyObj<ServiceManagerService>;
    let mockLocationService: jasmine.SpyObj<LocationService>;
    let mockEventTypeService: jasmine.SpyObj<EventTypeService>;
    let mockCategoryService: jasmine.SpyObj<CategoryService>;
    let router: Router;

    beforeEach(async () => {
        mockServiceManagerService = jasmine.createSpyObj(
            'ServiceManagerService',
            ['createService']
        );
        mockLocationService = jasmine.createSpyObj('LocationService', [
            'getAutocompleteLocations',
            'getLocationDetails',
        ]);
        mockEventTypeService = jasmine.createSpyObj('EventTypeService', [
            'getAll',
        ]);
        mockCategoryService = jasmine.createSpyObj('CategoryService', [
            'getCategories',
        ]);

        await TestBed.configureTestingModule({
            declarations: [CreateServiceComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: ServiceManagerService,
                    useValue: mockServiceManagerService,
                },
                { provide: LocationService, useValue: mockLocationService },
                { provide: EventTypeService, useValue: mockEventTypeService },
                { provide: CategoryService, useValue: mockCategoryService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateServiceComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
        expect(component.createServiceForm.valid).toBeFalse();
        expect(component.createServiceForm.get('price')?.value).toBe(0);
        expect(component.createServiceForm.get('eventTypes')?.value).toEqual(
            []
        );
    });

    it('should invalidate form if required fields are missing', () => {
        component.createServiceForm.get('name')?.setValue('');
        component.createServiceForm.get('description')?.setValue('');
        expect(component.createServiceForm.valid).toBeFalse();
    });

    it('should validate price field to be at least 1', () => {
        component.createServiceForm.get('price')?.setValue(0);
        expect(component.createServiceForm.get('price')?.valid).toBeFalse();
    });

    it('should validate discount field not to exceed 100', () => {
        component.createServiceForm.get('discount')?.setValue(150);
        expect(component.createServiceForm.get('discount')?.valid).toBeFalse();
    });

    it('should validate minImages validator with empty image list', () => {
        const result = component.createServiceForm.get('images')?.errors;
        expect(result).toEqual({ minImages: true });
    });

    it('should add images and update form validity', () => {
        const file = new File([''], 'image.png', { type: 'image/png' });
        component.onFileSelected({ target: { files: [file] } } as any);
        expect(component.images.length).toBe(1);
        expect(component.createServiceForm.get('images')?.valid).toBeTrue();
    });

    it('should remove image from list', () => {
        const file = new File([''], 'image.png', { type: 'image/png' });
        component.images.push(file);
        component.removeImage(0);
        expect(component.images.length).toBe(0);
    });

    it('should format AM/PM time correctly', () => {
        const result = component.formatTime('2:30 PM');
        expect(result).toBe('14:30');
    });

    it('should format 24h time correctly', () => {
        const result = component.formatTime('09:15');
        expect(result).toBe('09:15');
    });

    it('should filter categories based on input', () => {
        component.categories = ['Music', 'Dance', 'Sports'];
        component.filterCategories({ target: { value: 'da' } });
        expect(component.filteredCategories).toEqual(['Dance']);
    });

    it('should filter event types based on input', () => {
        component.eventTypes = ['Wedding', 'Birthday', 'Corporate'];
        component.filterEventTypes({ target: { value: 'b' } });
        expect(component.filteredEventTypes).toEqual(['Birthday']);
    });

    it('should load categories on init', () => {
        const mockCategories = [
            {
                id: 1,
                name: 'Music',
                description: 'Music category',
                isDeleted: false,
                status: 'ACCEPTED' as 'ACCEPTED',
            },
        ];

        mockCategoryService.getCategories.and.returnValue(of(mockCategories));
        component.loadCategories();

        expect(mockCategoryService.getCategories).toHaveBeenCalled();
    });

    it('should load event types on init', () => {
        const mockEventTypes = [
            {
                id: 1,
                name: 'Conference',
                description: 'A large formal meeting',
            },
        ];

        mockEventTypeService.getAll.and.returnValue(of(mockEventTypes));
        component.loadEventTypes();

        expect(mockEventTypeService.getAll).toHaveBeenCalled();
    });

    it('should handle location autocomplete', fakeAsync(() => {
        mockLocationService.getAutocompleteLocations.and.returnValue(
            of([{ displayName: 'NYC' }])
        );

        mockEventTypeService.getAll.and.returnValue(of([]));
        mockCategoryService.getCategories.and.returnValue(of([]));

        fixture.detectChanges();

        const locationControl = component.createServiceForm.get('location');
        locationControl?.setValue('New');

        tick(3000);

        fixture.detectChanges();

        expect(component.autocompleteOptions.length).toBeGreaterThan(0);
    }));

    it('should select a location and get details', () => {
        mockLocationService.getLocationDetails.and.returnValue(
            of({ city: 'Paris', country: 'France' })
        );
        component.onLocationSelected({ displayName: 'Paris' });
        expect(component.createServiceForm.get('location')?.value).toBe(
            'Paris'
        );
    });

    it('should submit valid form and navigate', fakeAsync(() => {
        spyOn(console, 'error');

        mockEventTypeService.getAll.and.returnValue(of([]));
        mockCategoryService.getCategories.and.returnValue(of([]));
        mockServiceManagerService.createService.and.returnValue(of(void 0));

        fixture.detectChanges();

        component.createServiceForm.setValue({
            name: 'Test Service',
            description: 'Description here',
            price: 100,
            discount: 10,
            images: [new File([''], 'img.png')],
            isVisible: true,
            isAvailable: true,
            category: 'Category',
            eventTypes: ['Event1'],
            location: 'Location',
            reservationType: 'AUTOMATIC',
            specifics: 'Some specifics',
            duration: 30,
            minEngagement: 1,
            maxEngagement: 3,
            reservationDeadline: 10,
            cancellationDeadline: 10,
            workingHoursStart: '09:00',
            workingHoursEnd: '17:00',
        });

        component.selectedLocationDetails = {
            city: 'City',
            country: 'Country',
            longitude: 10,
            latitude: 20,
        };

        component.create();

        tick(3000);

        expect(mockServiceManagerService.createService).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/services']);
    }));

    it('should not submit if form is invalid', () => {
        component.createServiceForm.get('name')?.setValue('');
        component.create();
        expect(mockServiceManagerService.createService).not.toHaveBeenCalled();
    });

    it('should log error if createService fails', () => {
        spyOn(console, 'error');

        component.createServiceForm.setValue({
            name: 'Test Service',
            description: 'Description here',
            price: 100,
            discount: 0,
            images: [new File([''], 'test.png')],
            isVisible: true,
            isAvailable: true,
            category: 'Some Category',
            eventTypes: ['Event1'],
            location: 'Some Location',
            reservationType: 'AUTOMATIC',
            specifics: 'Some specifics',
            duration: 30,
            minEngagement: 1,
            maxEngagement: 3,
            reservationDeadline: 10,
            cancellationDeadline: 10,
            workingHoursStart: '09:00',
            workingHoursEnd: '17:00',
        });

        component.selectedLocationDetails = {
            city: 'CityName',
            country: 'CountryName',
            longitude: 1,
            latitude: 2,
        };
        mockServiceManagerService.createService.and.returnValue(
            throwError(() => new Error('Failed'))
        );
        component.create();

        expect(console.error).toHaveBeenCalledWith(
            'Error creating service:',
            jasmine.any(Error)
        );
    });

    it('should revoke object URLs on destroy', () => {
        const file = new File([''], 'test.png');
        const url = component.imageToUrl(file);
        spyOn(URL, 'revokeObjectURL');
        component.ngOnDestroy();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
    });
});
