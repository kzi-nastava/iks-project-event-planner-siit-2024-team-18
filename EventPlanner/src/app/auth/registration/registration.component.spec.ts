import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category-service.service';
import { EventTypeService } from '../../services/event-type.service';
import { MaterialModule } from '../../infrastructure/material/material.module';
import {
    BrowserAnimationsModule,
    NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import {
    createUserServiceMock,
    createCategoryServiceMock,
    createEventTypeServiceMock,
    createSnackBarMock,
    createRouterMock,
    mockCategories,
    mockEventTypes,
} from '../../mocks/registration.service.mock';
import { UserService } from '../../services/user.service';

describe('RegistrationComponent', () => {
    let fixture: ComponentFixture<RegistrationComponent>;
    let component: RegistrationComponent;

    let userServiceMock: any;
    let categoryServiceMock: any;
    let eventTypeServiceMock: any;
    let snackBarMock: any;
    let routerMock: any;

    beforeEach(async () => {
        userServiceMock = createUserServiceMock();
        categoryServiceMock = createCategoryServiceMock();
        eventTypeServiceMock = createEventTypeServiceMock();
        snackBarMock = createSnackBarMock();
        routerMock = createRouterMock();

        await TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: UserService, useValue: userServiceMock },
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: EventTypeService, useValue: eventTypeServiceMock },
                { provide: MatSnackBar, useValue: snackBarMock },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should validate registration form with correct data for event organizer', () => {
        const form = component.registrationForm;
        form.patchValue({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            companyName: '',
            address: '123 Main St',
            phoneNumber: '063555333',
            description: '',
            categories: [],
            eventTypes: [],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Event Organizer',
        });

        component.registrationForm.markAllAsTouched();
        component.registrationForm.get('companyName')?.setErrors(null);
        component.registrationForm.get('description')?.setErrors(null);
        component.registrationForm.get('categories')?.setErrors(null);
        component.registrationForm.get('eventTypes')?.setErrors(null);

        expect(form.valid).toBeTrue();
    });

    it('should validate registration form with correct data for service product provider', () => {
        const form = component.registrationForm;
        form.patchValue({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            companyName: 'Company 1',
            address: '123 Main St',
            phoneNumber: '063555333',
            description: 'Test description for test company.',
            categories: [mockCategories[0].name],
            eventTypes: [mockEventTypes[0].name],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Service Product Provider',
        });

        component.registrationForm.markAllAsTouched();

        expect(form.valid).toBeTrue();
    });

    it('should not validate registration form with empty data', () => {
        const form = component.registrationForm;
        form.patchValue({
            email: '',
            firstName: '',
            lastName: '',
            companyName: '',
            address: '',
            phoneNumber: '',
            description: '',
            categories: [],
            eventTypes: [],
            profilePhoto: '',
            password: '',
            confirmPassword: '',
            role: '',
        });

        component.registrationForm.markAllAsTouched();

        expect(form.valid).toBeFalse();
    });

    it('should call eventOrganizerRegistration and navigate on login', fakeAsync(() => {
        component.registrationForm.patchValue({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            companyName: '',
            address: '123 Main St',
            phoneNumber: '063555333',
            description: '',
            categories: [],
            eventTypes: [],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Event Organizer',
        });

        component.submit();
        tick();

        expect(userServiceMock.eventOrganizerRegistration).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
        expect(snackBarMock.open).toHaveBeenCalled();
    }));

    it('should call serviceProductProviderRegistration and navigate on login', fakeAsync(() => {
        component.registrationForm.patchValue({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            companyName: 'Company 1',
            address: '123 Main St',
            phoneNumber: '063555333',
            description: 'Test description for test company.',
            categories: [mockCategories[1].name],
            eventTypes: [mockEventTypes[1].name],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Service Product Provider',
        });

        component.submit();
        tick();

        expect(
            userServiceMock.serviceProductProviderRegistration
        ).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
        expect(snackBarMock.open).toHaveBeenCalled();
    }));

    it('should show snackbar error when registration fails with 400', fakeAsync(() => {
        userServiceMock.eventOrganizerRegistration.and.returnValue(
            throwError({ status: 400 })
        );

        component.registrationForm.patchValue({
            email: 'duplicate@example.com',
            firstName: 'Dup',
            lastName: 'User',
            companyName: '',
            address: 'Dup St',
            phoneNumber: '0111222333',
            description: '',
            categories: [],
            eventTypes: [],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Event Organizer',
        });

        component.submit();
        tick();

        expect(snackBarMock.open).toHaveBeenCalledWith(
            'User with email duplicate@example.com already exist.',
            'OK'
        );
    }));

    it('should show general error snackbar on unexpected failure', fakeAsync(() => {
        userServiceMock.eventOrganizerRegistration.and.returnValue(
            throwError({ status: 500 })
        );

        component.registrationForm.patchValue({
            email: 'crash@example.com',
            firstName: 'Crash',
            lastName: 'Test',
            companyName: '',
            address: 'Crash Ave',
            phoneNumber: '0123456789',
            description: '',
            categories: [],
            eventTypes: [],
            profilePhoto: '',
            password: '123',
            confirmPassword: '123',
            role: 'Event Organizer',
        });

        component.submit();
        tick();

        expect(snackBarMock.open).toHaveBeenCalledWith(
            'An unexpected error occurred while creating user.',
            'OK',
            { duration: 3000 }
        );
    }));

    it('should not require service product provider fields for Event Organizer role', () => {
        component.registrationForm.patchValue({ role: 'Event Organizer' });

        component.registrationForm.get('companyName')?.setValue('');
        component.registrationForm.get('description')?.setValue('');
        component.registrationForm.get('categories')?.setValue([]);
        component.registrationForm.get('eventTypes')?.setValue([]);

        expect(component.registrationForm.valid).toBeFalse();

        component.submit();

        expect(
            component.registrationForm.get('companyName')?.errors
        ).toBeNull();
        expect(
            component.registrationForm.get('description')?.errors
        ).toBeNull();
        expect(component.registrationForm.get('categories')?.errors).toBeNull();
        expect(component.registrationForm.get('eventTypes')?.errors).toBeNull();
    });

    it('should require service product provider fields for Service Product Provider role', () => {
        component.registrationForm.patchValue({
            role: 'Service Product Provider',
        });

        component.registrationForm.get('companyName')?.setValue('');
        component.registrationForm.get('description')?.setValue('');
        component.registrationForm.get('categories')?.setValue([]);
        component.registrationForm.get('eventTypes')?.setValue([]);

        component.submit();

        expect(
            component.registrationForm.get('companyName')?.errors?.['required']
        ).toBeTrue();
        expect(
            component.registrationForm.get('description')?.errors?.['required']
        ).toBeTrue();
        expect(
            component.registrationForm.get('categories')?.errors?.['required']
        ).toBeTrue();
        expect(
            component.registrationForm.get('eventTypes')?.errors?.['required']
        ).toBeTrue();
    });

    it('should show error if email is invalid', () => {
        const emailControl = component.registrationForm.get('email');
        emailControl?.setValue('invalid');
        emailControl?.markAsTouched();

        expect(emailControl?.errors?.['email']).toBeTrue();
    });

    it('should show error if phone number is not 9-10 digits', () => {
        const phoneControl = component.registrationForm.get('phoneNumber');

        phoneControl?.setValue('123');
        phoneControl?.markAsTouched();

        expect(phoneControl?.hasError('pattern')).toBeTrue();

        phoneControl?.setValue('12345678901');
        phoneControl?.markAsTouched();

        expect(phoneControl?.hasError('pattern')).toBeTrue();
    });

    it('should accept valid phone number', () => {
        const phoneControl = component.registrationForm.get('phoneNumber');

        phoneControl?.setValue('0612345678');
        phoneControl?.markAsTouched();

        expect(phoneControl?.valid).toBeTrue();
    });

    it('should mark confirmPassword as notMatching if they differ', () => {
        component.registrationForm.get('password')?.setValue('pass123');
        component.registrationForm.get('confirmPassword')?.setValue('wrong123');

        const confirmControl =
            component.registrationForm.get('confirmPassword');

        expect(confirmControl?.errors?.['notMatching']).toBeTrue();
    });

    it('should NOT call userService registration methods when form is invalid', () => {
        component.registrationForm.patchValue({ email: '' });

        component.submit();

        expect(
            userServiceMock.eventOrganizerRegistration
        ).not.toHaveBeenCalled();
        expect(
            userServiceMock.serviceProductProviderRegistration
        ).not.toHaveBeenCalled();
    });

    it('should load categories and event types on ngOnInit', () => {
        categoryServiceMock.getCategories.and.returnValue(of(mockCategories));
        eventTypeServiceMock.getAll.and.returnValue(of(mockEventTypes));

        component.ngOnInit();

        expect(component.categoriesList).toEqual(
            mockCategories.map((c) => c.name)
        );
        expect(component.eventTypesList).toEqual(
            mockEventTypes.map((e) => e.name)
        );
    });
});
