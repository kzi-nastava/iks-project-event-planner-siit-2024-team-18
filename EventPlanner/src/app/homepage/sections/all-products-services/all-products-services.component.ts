import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../../services/product-service.service';
import { ProductService } from '../../../models/product-service.model';

@Component({
  selector: 'app-all-products-services',
  templateUrl: './all-products-services.component.html',
  styleUrls: ['./all-products-services.component.css']
})
export class AllProductsServicesComponent implements OnInit {
  productsServices: ProductService[] = [];
  filteredProductsServices: ProductService[] = [];
  paginatedProductsServices: ProductService[] = [];
  loading: boolean = true;

  currentPage: number = 1;
  productsServicesPerPage: number = 5;
  totalPages: number = 1;

  searchQuery: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedFilter: string = 'title';
  sortOrder: string = 'asc';

  constructor(
    private productServiceService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProductsServices();
  }

  fetchProductsServices(): void {
    this.productServiceService.getAllProductsServices().subscribe({
      next: (data) => {
        this.productsServices = data;
        this.filteredProductsServices = [...data];
        this.initializePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products/services:', err);
        this.loading = false;
      }
    });
  }

  initializePagination(): void {
    this.totalPages = Math.ceil(this.filteredProductsServices.length / this.productsServicesPerPage);
    this.updatePaginatedProductsServices();
  }

  updatePaginatedProductsServices(): void {
    const startIndex = (this.currentPage - 1) * this.productsServicesPerPage;
    this.paginatedProductsServices = this.filteredProductsServices.slice(startIndex, startIndex + this.productsServicesPerPage);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProductsServices();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProductsServices();
    }
  }

  openProductServiceDetails(productService: ProductService): void {
    this.productServiceService.openProductServiceDetails(productService.id);
  }

  applySearch(): void {
    this.filteredProductsServices = this.productsServices.filter(productService =>
      productService.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      productService.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.resetPagination();
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

  applyTypeFilter(type: String): void {
    // Only show products/services based on type 
  }

  applySort(): void {
    this.filteredProductsServices.sort((a, b) => {
      const compareField = this.selectedFilter === 'title' ? a.title : a.description;
      const compareWith = this.selectedFilter === 'title' ? b.title : b.description;
      return this.sortOrder === 'asc'
        ? compareField.localeCompare(compareWith)
        : compareWith.localeCompare(compareField);
    });
    this.resetPagination();
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.initializePagination();
  }
}
