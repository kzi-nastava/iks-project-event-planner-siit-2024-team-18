import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagerService {
  constructor(private router : Router) {}
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
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
      isDeleted: true,
      reservationType: 'manual',
      specifics: "specifics",
      minDuration: 120,
      maxDuration: 180,
      reservationDeadline: 5,
      cancellationDeadline: 5,
    },
  ];
  
  getTopFiveServices(): Observable<Service[]> {
    return of(this.services.slice(0, 5));
  }

  getServices(): Observable<Service[]> {
    return of(this.services);
  }

  getServiceById(id: number): Service | undefined {
    return this.services.find(service => service.id === id);
  }

  createService(service: Service): Service {
    service.id = this.services.length + 1;
    this.services.push(service);
    return service;
  }

  deleteService(serviceId: number): void {
    this.services = this.services.filter(service => service.id !== serviceId);
  }


  openServiceDetails(serviceId: number) {
    if(serviceId){
      this.router.navigate(['/service/', serviceId]);
    } else {
      console.log('Invalid service Id: ', serviceId);
    }
  }
}
