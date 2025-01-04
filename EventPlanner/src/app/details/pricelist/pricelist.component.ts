import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { Service } from '../../models/service.model';
import { MatDialog } from '@angular/material/dialog';
import { ServiceManagerService } from '../../services/service-manager.service';
import { ProductManagerService } from '../../services/product-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent {
  activeTab: 'products' | 'services' = 'products';
  products: Product[] = [];
  services: Service[] = [];

  constructor(
    private dialog: MatDialog,
    private serviceService: ServiceManagerService,
    private productService: ProductManagerService,
    private snackBar: MatSnackBar,
  ) {
    this.loadData();
  }

  loadData() {
    this.serviceService.getServicesByCreator().subscribe({
      next: (data: Service[]) => {
        this.services = data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      },
    });

    this.productService.getProductsByCreator().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  editItem(item: any): void {
    const updatedPrice = prompt('Enter new price:', item.price);
    const updatedDiscount = prompt('Enter new discount:', item.discount);

    if (updatedPrice !== null && !isNaN(+updatedPrice)) {
      item.price = +updatedPrice;
    }
    if (updatedDiscount !== null && !isNaN(+updatedDiscount)) {
      item.discount = +updatedDiscount;
    }
  }

  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  toggleTab(): void {
    this.activeTab = this.activeTab === 'products' ? 'services' : 'products';
  }
}
