import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductManagerService } from '../../../services/product-manager.service';
import { ServiceManagerService } from '../../../services/service-manager.service';
import { Product } from '../../../models/product.model';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-all-products-services',
  templateUrl: './all-products-services.component.html',
  styleUrls: ['./all-products-services.component.css'],
})
export class AllProductsServicesComponent implements OnInit {
  products: Product[] = [];
  services: Service[] = [];
  filteredProducts: Product[] = [];
  filteredServices: Service[] = [];
  paginatedProducts: Product[] = [];
  paginatedServices: Service[] = [];
  loading: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  fromDate: Date | null = null;
  toDate: Date | null = null;

  searchQuery: string = '';
  selectedFilter: string = 'title';
  sortOrder: string = 'asc';

  showProducts: boolean = true;

  constructor(
    private productManager: ProductManagerService,
    private serviceManager: ServiceManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchServices();
  }

  fetchProducts(): void {
    this.productManager.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        if (this.showProducts) this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      },
    });
  }

  fetchServices(): void {
    this.serviceManager.getServices().subscribe({
      next: (data) => {
        this.services = data;
        if (!this.showProducts) this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    if (this.showProducts) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.sortItems(this.filteredProducts);
    } else {
      this.filteredServices = this.services.filter((service) =>
        service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.sortItems(this.filteredServices);
    }
    this.initializePagination();
  }

  applyDateFilter(): void {
    // this.filteredProductsServices = this.productsServices.filter(productService => {
    //   const productDate = new Date(productService.date);
    //   const isWithinFromDate = !this.fromDate || productDate >= this.fromDate;
    //   const isWithinToDate = !this.toDate || productDate <= this.toDate;
    //   return isWithinFromDate && isWithinToDate;
    // });
    this.resetPagination();
  }

  initializePagination(): void {
    const filteredList = this.showProducts
      ? this.filteredProducts
      : this.filteredServices;
    this.totalPages = Math.ceil(filteredList.length / this.itemsPerPage);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    if (this.showProducts) {
      this.paginatedProducts = this.filteredProducts.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    } else {
      this.paginatedServices = this.filteredServices.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  openDetails(item: Product | Service): void {
    if (this.showProducts) {
      this.productManager.openProductDetails((item as Product).id);
    } else {
      this.serviceManager.openServiceDetails((item as Service).id);
    }
  }

  toggleView(showProducts: boolean): void {
    this.showProducts = showProducts;
    this.applyFilter();
  }

  sortItems(list: (Product | Service)[]): void {
    list.sort((a, b) => {
      const compareField =
        this.selectedFilter === 'title' ? 'title' : 'description';
      const valueA = (a as any)[compareField]?.toLowerCase() || '';
      const valueB = (b as any)[compareField]?.toLowerCase() || '';
      return this.sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.initializePagination();
  }

  applySearch(): void {
    this.applyFilter();
    this.resetPagination();
  }
}
