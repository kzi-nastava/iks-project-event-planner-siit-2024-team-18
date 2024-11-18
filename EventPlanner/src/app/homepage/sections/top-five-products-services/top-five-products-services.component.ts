import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { ProductService } from '../../../models/product-service.model';

@Component({
  selector: 'app-top-five-products-services',
  templateUrl: './top-five-products-services.component.html',
  styleUrls: ['./top-five-products-services.component.css']
})
export class TopFiveProductsServicesComponent implements OnInit {
  products: ProductService[] = [];
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(private productServiceService: ProductServiceService) {}

  ngOnInit(): void {
    this.productServiceService.getTopFiveProductsServices().subscribe((data) => {
      this.products = data;
    });
  }

  prevProduct(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products.length - 1;
    }
    this.updateSwiperPosition();
  }

  nextProduct(): void {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSwiperPosition();
  }

  goToProduct(index: number): void {
    this.currentIndex = index;
    this.updateSwiperPosition();
  }

  private updateSwiperPosition(): void {
    this.swiperOffset = -this.currentIndex * 100;
  }

  openProductServiceDetails(productService: ProductService): void {
    this.productServiceService.openProductServiceDetails(productService.id);
  }
}
