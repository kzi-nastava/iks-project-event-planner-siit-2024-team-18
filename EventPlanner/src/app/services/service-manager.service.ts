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
      _id: 1,
      title: 'Photography',
      description: 'Capture your special moments with professional photography services.',
      category: 'Photography',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-15'),
      reservationTime: '10:00 AM',
      cancellationDate: new Date('2024-12-10'),
      price: 500,
      discount: 50,
      isPublic: true,
      isVisible: true,
      duration: 120,
      reservationType: 'manual',
      images: ['assets/images/catering.jpg'],
      specifics: 'specifics',
    },
    {
      _id: 2,
      title: 'Catering',
      description: 'Delicious food to impress your guests, with a variety of options.',
      images: ['assets/images/dj.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-20'),
      reservationTime: '12:00 PM',
      cancellationDate: new Date('2024-12-18'),
      price: 300,
      discount: 30,
      isPublic: true,
      isVisible: true,
      duration: 180,
      reservationType: 'auto',
      specifics: 'specifics',
    },
    {
      _id: 3,
      title: 'Decoration',
      description: 'Beautiful decorations to enhance the ambiance of your event.',
      images: ['assets/images/decoration.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-25'),
      reservationTime: '3:00 PM',
      cancellationDate: new Date('2024-12-22'),
      price: 200,
      discount: 25,
      isPublic: true,
      isVisible: true,
      duration: 90,
      specifics: 'specifics',
      reservationType: 'manual',
    },
    {
      _id: 4,
      title: 'DJ Services',
      description: 'Get the party started with professional DJ services.',
      images: ['assets/images/photography.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-28'),
      reservationTime: '7:00 PM',
      cancellationDate: new Date('2024-12-24'),
      price: 600,
      discount: 50,
      isPublic: true,
      isVisible: true,
      duration: 180,
      specifics: 'specifics',
      reservationType: 'auto',
    },
    {
      _id: 5,
      title: 'Lighting Setup',
      description: 'Create the perfect atmosphere with customized lighting.',
      images: ['assets/images/lighting.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-30'),
      reservationTime: '5:00 PM',
      cancellationDate: new Date('2024-12-28'),
      price: 400,
      discount: 40,
      isPublic: true,
      isVisible: true,
      duration: 150,
      specifics: 'specifics',
      reservationType: 'manual',
    },
    {
      _id: 6,
      title: 'Flower Arrangements',
      description: 'Elegant flower arrangements to complement your event.',
      images: ['assets/images/no_image.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-22'),
      reservationTime: '2:00 PM',
      cancellationDate: new Date('2024-12-20'),
      price: 250,
      discount: 20,
      isPublic: true,
      isVisible: true,
      duration: 60,
      specifics: 'specifics',
      reservationType: 'auto',
    },
    {
      _id: 7,
      title: 'Videography',
      description: 'Capture the moments with professional videography.',
      images: ['assets/images/catering.jpg'],
      category: 'Wedding',
      eventType: 'Wedding',
      reservationDate: new Date('2024-12-18'),
      reservationTime: '9:00 AM',
      cancellationDate: new Date('2024-12-15'),
      price: 700,
      discount: 70,
      isPublic: true,
      isVisible: true,
      duration: 180,
      specifics: 'specifics',
      reservationType: 'manual',
    },
  ];
  
  getTopFiveServices(): Observable<Service[]> {
    return of(this.services.slice(0, 5));
  }

  getServices(): Observable<Service[]> {
    return of(this.services);
  }

  getServiceById(id: number): Service | undefined {
    return this.services.find(service => service._id === id);
  }

  createService(service: Service): Service {
    service._id = this.services.length + 1;
    this.services.push(service);
    return service;
  }

  deleteService(serviceId: number): void {
    this.services = this.services.filter(service => service._id !== serviceId);
  }


  openServiceDetails(serviceId: number) {
    if(serviceId){
      this.router.navigate(['/service/', serviceId]);
    } else {
      console.log('Invalid service Id: ', serviceId);
    }
  }
}
