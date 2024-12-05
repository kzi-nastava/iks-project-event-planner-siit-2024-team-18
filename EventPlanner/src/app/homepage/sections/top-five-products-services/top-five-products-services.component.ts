import { Component, OnInit } from '@angular/core';
import { ServiceManagerService } from '../../../services/service-manager.service';
import { Service } from '../../../models/service.model';
import { ProductManagerService } from '../../../services/product-manager.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-top-five-products-services',
  templateUrl: './top-five-products-services.component.html',
  styleUrls: ['./top-five-products-services.component.css'],
})
export class TopFiveProductsServicesComponent implements OnInit {
  products: Product[] = [];
  services: Service[] = [];
  currentIndex: number = 0;
  swiperOffset: number = 0;
  showProducts: boolean = false;

  constructor(
    private productManager: ProductManagerService,
    private serviceManager: ServiceManagerService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchServices();
  }

  fetchProducts(): void {
    this.productManager.getTopFiveProducts().subscribe((data) => {
      this.products = data;
      console.log('Fetched Products:', data); // Log the products to verify

    });
  }

  fetchServices(): void {
    this.serviceManager.getTopFiveServices().subscribe((data) => {
      this.services = data;
    });
  }

  prevItem(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.currentList.length - 1;
    }
    this.updateSwiperPosition();
  }

  nextItem(): void {
    if (this.currentIndex < this.currentList.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSwiperPosition();
  }

  goToItem(index: number): void {
    this.currentIndex = index;
    this.updateSwiperPosition();
  }

  private updateSwiperPosition(): void {
    this.swiperOffset = -this.currentIndex * 100;
  }

  openDetails(item: Product | Service): void {
    if (this.showProducts) {
      this.productManager.openProductDetails((item as Product).id);
    } else {
      this.serviceManager.openServiceDetails((item as Service)._id);
    }
  }

  get currentList(): (Product | Service)[] {
    return this.showProducts ? this.products : this.services;
  }
}
