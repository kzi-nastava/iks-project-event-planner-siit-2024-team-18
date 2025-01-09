import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { Service } from '../../models/service.model';
import { MatDialog } from '@angular/material/dialog';
import { ServiceManagerService } from '../../services/service-manager.service';
import { ProductManagerService } from '../../services/product-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPricelistComponent } from './../edit-pricelist/edit-pricelist.component';
import { PricelistService } from '../../services/pricelist.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

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
    private pricelistService: PricelistService,
    private snackBar: MatSnackBar,
    private http: HttpClient) {
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

  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  toggleTab(): void {
    this.activeTab = this.activeTab === 'products' ? 'services' : 'products';
  }

  editItem(item: any) {
    const dialogRef = this.dialog.open(EditPricelistComponent, {
      width: '500px',
      data: { solution: item }
    });
  
    dialogRef.afterClosed().subscribe(updatedSolution => {
      if (updatedSolution) {
        this.pricelistService.updatePricelistItem(updatedSolution, updatedSolution.id).subscribe({
          next: () => {
            this.loadData();
          },
          error: (err) => {
            console.error('Error updating solution:', err);
            this.snackBar.open('Error updating solution!', 'OK', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  createPDF(): void {
    const data = this.activeTab === 'products' ? this.products : this.services;
    const url = "/api/pdf/" + this.activeTab;
    this.pricelistService.createPdf(data, url).subscribe({
      next: (response: Blob) => {
        saveAs(response, `${this.activeTab}_pricelist.pdf`);
      },
      error: (err) => {
        console.error('Error creating PDF:', err);
        this.snackBar.open('Error creating PDF!', 'OK', {
          duration: 3000,
        });
      }
    });
  }
}
