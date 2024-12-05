import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../models/service.model';
import { ServiceManagerService } from '../../services/service-manager.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  serviceId!: number;
  service: Service | null = null;
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serviceId = +id;
      this.fetchServiceDetails(this.serviceId);
    } else {
      this.router.navigate(['']);
    }
  }

  fetchServiceDetails(serviceId: number): void {
    this.service = this.serviceManager.getServiceById(serviceId)!;
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
}
