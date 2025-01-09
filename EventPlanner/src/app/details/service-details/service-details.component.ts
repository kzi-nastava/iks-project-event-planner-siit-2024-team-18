import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceManagerService } from '../../services/service-manager.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  serviceId!: number;
  service: Service | null = null;
  isBlocked: boolean = false;
  currentImageIndex: number = 0; 
  isFavorite: boolean = false; 
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private serviceManager: ServiceManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.serviceManager
        .getServiceById(+params['id'])
        .subscribe((service) => (this.service = service));
      const id = +params['id'];
      if (!isNaN(id)) {
        this.fetchServiceDetails(id);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  fetchServiceDetails(serviceId: number): void {
    this.serviceManager.getServiceById(serviceId).subscribe({
      next: (data: Service | null) => {
        if (data) {
          this.service = data;
        } else {
          this.isBlocked = true;
        }
      },
      error: (err) => {
        console.error('Failed to fetch service details:', err);
        this.router.navigate(['']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  prevImage(): void {
    if (this.service?.images) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.service.images.length - 1;
      }
      this.updateSwiperPosition();
    }
  }

  nextImage(): void {
    if (this.service?.images) {
      if (this.currentIndex < this.service.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateSwiperPosition();
    }
  }

  goToImage(index: number): void {
    if (this.service?.images) {
      this.currentIndex = index;
      this.updateSwiperPosition();
    }
  }

  private updateSwiperPosition(): void {
    this.swiperOffset = -this.currentIndex * 100;
  }
  
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  bookService(serviceId: number): void {
    if (serviceId) {
      this.router.navigate([`/service/${serviceId}/reserve`]);
    } else {
      console.error('Service ID is not available');
    }
  }
}
