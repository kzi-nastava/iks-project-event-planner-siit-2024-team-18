import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagerService {
  constructor(private router : Router, private http: HttpClient) {}
  
  private services: Service[] = [
    {
      id: 1,
      name: 'Photography',
      description: 'Capture your special moments with professional photography services.',
      price: 500,
      discount: 50,
      images: ['assets/images/catering.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 2,
      name: 'Catering',
      description: 'Delicious food to impress your guests, with a variety of options.',
      price: 500,
      discount: 50,
      images: ['assets/images/dj.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 3,
      name: 'Decoration',
      description: 'Beautiful decorations to enhance the ambiance of your event.',
      price: 500,
      discount: 50,
      images: ['assets/images/decoration.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 4,
      name: 'DJ Services',
      description: 'Get the party started with professional DJ services.',
      price: 500,
      discount: 50,
      images: ['assets/images/photography.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 5,
      name: 'Lighting Setup',
      description: 'Create the perfect atmosphere with customized lighting.',
      price: 500,
      discount: 50,
      images: ['assets/images/lighting.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 6,
      name: 'Flower Arrangements',
      description: 'Elegant flower arrangements to complement your event.',
      price: 500,
      discount: 50,
      images: ['assets/images/no_image.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
    {
      id: 7,
      name: 'Videography',
      description: 'Capture the moments with professional videography.',
      price: 500,
      discount: 50,
      images: ['assets/images/catering.jpg'],
      isVisible: true,
      isAvailable: true,
      category: "category",
      eventTypes: ["eventTypes"],
      location: "location",
      creator: "creator",
      isDeleted: true,
      status: 'ACCEPTED',
      reservationType: 'MANUAL',
      specifics: "specifics",
      duration: 120,
      minEngagement: 1,
      maxEngagement: 5,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
  ];

  getTopFiveServices(): Observable<Service[]> {
    return of(this.services.slice(0, 5));
  }

  getServiceByIdStatic(id: number): Service {
    return this.services[0];
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(environment.apiHost + '/api/services');
  }

  searchAndFilter(name: string): Observable<Service[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Service[]>(`${environment.apiHost}/api/services/search`, { params });
  }
  
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(environment.apiHost + "/api/services/details/" + id);
  }

  createService(service: any): Observable<any> {
    return this.http.post<string>(environment.apiHost + '/api/services/create', service);
  }

  updateService(service: any, id: number): Observable<any> {
    return this.http.put<string>(environment.apiHost + '/api/services/edit/' + id, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + '/api/services/delete/' + id);
  }
  

  openServiceDetails(serviceId: number) {
    if(serviceId){
      this.router.navigate(['/service/', serviceId]);
    } else {
      console.log('Invalid service Id: ', serviceId);
    }
  }
}
