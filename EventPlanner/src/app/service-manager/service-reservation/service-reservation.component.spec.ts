import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceReservationComponent } from './service-reservation.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ReservationService } from '../../services/reservation.service';
import { ServiceManagerService } from '../../services/service-manager.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { of, throwError } from 'rxjs';
import { Reservation } from '../../models/reservation.model';
import { EventCard } from '../../models/event-card.model';
import { AuthService } from '../../auth/auth.service';
import { mockService1, mockService2, mockService3, mockService4, mockService5 } from '../../mocks/service-manager.service.mock';
import { mockEvent1 } from '../../mocks/event.service.mock';
import { mockReservation1 } from '../../mocks/reservation.service.mock';

describe('ServiceReservationComponent', () => {
  let component: ServiceReservationComponent;
  let fixture: ComponentFixture<ServiceReservationComponent>;
  let reservationService: jasmine.SpyObj<ReservationService>;
  let serviceManagerService: jasmine.SpyObj<ServiceManagerService>;
  let eventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    const reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['createReservation', 'getReservationsByServiceId']);
    const serviceManagerServiceSpy = jasmine.createSpyObj('ServiceManagerService', ['getServiceById']);
    const eventServiceSpy = jasmine.createSpyObj('EventService', ['getEventsByOrganizerId']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getUserInfo']);
  
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null),
        },
      },
    };
  
    authServiceSpy.isLoggedIn.and.returnValue(true);
  
    serviceManagerServiceSpy.getServiceById.and.returnValue(of(mockService1));
  
    eventServiceSpy.getEventsByOrganizerId.and.returnValue(of([
      mockEvent1
    ]));
  
    reservationServiceSpy.getReservationsByServiceId.and.returnValue(of([
      mockReservation1
    ]));
  
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), MaterialModule],
      declarations: [ServiceReservationComponent],
      providers: [
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: ServiceManagerService, useValue: serviceManagerServiceSpy },
        { provide: EventService, useValue: eventServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ServiceReservationComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationService) as jasmine.SpyObj<ReservationService>;
    serviceManagerService = TestBed.inject(ServiceManagerService) as jasmine.SpyObj<ServiceManagerService>;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
  
    fixture.detectChanges();
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch service details on init', () => {
    serviceManagerService.getServiceById.and.returnValue(of(mockService2));
    
    component.ngOnInit();
    
    expect(serviceManagerService.getServiceById).toHaveBeenCalled();
    expect(component.serviceDuration).toBe(mockService2.duration);
    expect(component.serviceProvider).toBe(mockService2.creator);
  });

  it('should fetch events by organizer', () => {
    const mockEvents: EventCard[] = [mockEvent1];
    
    eventService.getEventsByOrganizerId.and.returnValue(of(mockEvents));
  
    component.ngOnInit();
    fixture.detectChanges();
  
    expect(eventService.getEventsByOrganizerId).toHaveBeenCalled();
    expect(component.events.length).toBe(1);
    expect(component.selectedEvent.id).toBe(1);
  });

  it('should fetch current reservations for service', () => {
    const mockReservations: Reservation[] = [mockReservation1];
    reservationService.getReservationsByServiceId.and.returnValue(of(mockReservations));
    
    component.ngOnInit();
    
    expect(reservationService.getReservationsByServiceId).toHaveBeenCalled();
    expect(component.currentReservations.length).toBe(1);
  });

  it('should create reservation successfully on valid form', () => {
    serviceManagerService.getServiceById.and.returnValue(of(mockService3));
    eventService.getEventsByOrganizerId.and.returnValue(of([mockEvent1]));
  
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const futureDate = currentDate.toISOString().split('T')[0];
  
    reservationService.createReservation.and.returnValue(of({
      reservationId: 1, 
      serviceId: 1, 
      eventId: 1, 
      date: futureDate,
      timeFrom: '10:00', 
      timeTo: '11:00', 
      status: 'Confirmed' 
    }));
  
    component.ngOnInit();
    
    component.reservation.date = futureDate;
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '11:00';
    
    component.bookService();
  
    expect(reservationService.createReservation).toHaveBeenCalled();
    expect(component.isReserving).toBeFalse();
    expect(component.currentReservations.length).toBeGreaterThan(0);
  });  

  it('should create reservation successfully on valid form without duration', () => {
    serviceManagerService.getServiceById.and.returnValue(of(mockService4));
    eventService.getEventsByOrganizerId.and.returnValue(of([mockEvent1]));
  
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const futureDate = currentDate.toISOString().split('T')[0];
  
    reservationService.createReservation.and.returnValue(of({
      reservationId: 1, 
      serviceId: 1, 
      eventId: 1, 
      date: futureDate,
      timeFrom: '10:00', 
      timeTo: '12:00', 
      status: 'Confirmed' 
    }));
  
    component.ngOnInit();
    
    component.reservation.date = futureDate;
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '12:00';
    
    component.bookService();
  
    expect(reservationService.createReservation).toHaveBeenCalled();
    expect(component.isReserving).toBeFalse();
    expect(component.currentReservations.length).toBeGreaterThan(0);
  });

  it('should show an error alert when reservation date exceeds reservationDeadline', () => {
    serviceManagerService.getServiceById.and.returnValue(of(mockService5));
    eventService.getEventsByOrganizerId.and.returnValue(of([mockEvent1]));
  
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 16);
    const invalidFutureDate = currentDate.toISOString().split('T')[0];
  
    spyOn(window, 'alert');
  
    reservationService.createReservation.and.returnValue(throwError(() => new Error('Reservation deadline exceeded')));
  
    component.ngOnInit();
  
    component.reservation.date = invalidFutureDate;
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '11:00';
  
    component.bookService();
  
    expect(reservationService.createReservation).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to create reservation. Please try again later.');
    expect(component.isReserving).toBeFalse();
  });
  

  it('should show error alert when service is already reserved at the selected time', () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const futureDate = currentDate.toISOString().split('T')[0];
    
    spyOn(window, 'alert');
  
    reservationService.createReservation.and.returnValue(throwError(() => new Error('Service already reserved at this time')));
  
    component.reservation.date = futureDate;
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '11:00';
  
    component.bookService();
  
    expect(component.isReserving).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Failed to create reservation. Please try again later.');
  });

  it('should show error alert when service is not available for reservation', () => {
    spyOn(window, 'alert');
    
    serviceManagerService.getServiceById.and.returnValue(throwError(() => new Error('Service not available')));
    
    component.ngOnInit();
  
    expect(window.alert).toHaveBeenCalledWith('Failed to fetch service details. Please try again later.');
  });

  it('should show error alert when not all fields are filled', () => {
    spyOn(window, 'alert');
    
    component.reservation.date = '';
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '11:00';
    
    const result = component.validateFields();
  
    expect(result).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('All fields are required. Please fill in all the details.');
  });

  it('should show error alert when reservation date is in the past', () => {
    const pastDate = '2020-02-01';
    
    spyOn(window, 'alert');
    
    component.reservation.date = pastDate;
    component.reservation.fromTime = '10:00';
    component.reservation.toTime = '11:00';
    
    const result = component.validateFields();
  
    expect(result).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('The selected date cannot be in the past. Please choose a future date.');
  });

  it('should show error alert when start time is after end time', () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const futureDate = currentDate.toISOString().split('T')[0];
    
    spyOn(window, 'alert');
    
    component.reservation.date = futureDate;
    component.reservation.fromTime = '11:00';
    component.reservation.toTime = '10:00';
    
    const result = component.validateFields();
  
    expect(result).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Start time cannot be greater than or equal to end time. Please adjust the times.');
  });

  it('should disable "toTime" if service duration is set and "fromTime" changes', () => {
    component.serviceDuration = 60;
    component.reservation.fromTime = '10:00';
    component.onFromTimeChange();

    expect(component.reservation.toTime).toBe('11:00');
    expect(component.isToTimeDisabled).toBeTrue();
  });
});
