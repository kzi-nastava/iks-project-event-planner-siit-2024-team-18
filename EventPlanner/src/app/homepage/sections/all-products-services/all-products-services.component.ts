import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../../services/solution.service';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { SolutionCard } from '../../../models/solution-card.model';
import { ProductManagerService } from '../../../services/product-manager.service';
import { ServiceManagerService } from '../../../services/service-manager.service';

@Component({
  selector: 'app-all-products-services',
  templateUrl: './all-products-services.component.html',
  styleUrls: ['./all-products-services.component.css'],
})
export class AllProductsServicesComponent implements OnInit {
  solutions: SolutionCard[] = [];
  loading = true;

  currentPage = 0;
  itemsPerPage = 10;
  totalPages = 1;

  searchQuery = '';
  fromDate: string | undefined = undefined;
  toDate: string | undefined = undefined;
  selectedFilter = 'name';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  showProducts = true;

  sortOptions = [
    { value: 'name', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
    { value: 'price', label: 'Price' },
    { value: 'discount', label: 'Discount' },
    { value: 'categoryName', label: 'Category' },
    { value: 'providerFirstName', label: 'Creator Name' },
  ];

  constructor(
    private solutionService: SolutionService,
    private productManager: ProductManagerService,
    private serviceManager: ServiceManagerService
  ) {}

  ngOnInit(): void {
    this.fetchSolutions();
  }

  fetchSolutions(): void {
    this.loading = true;
    const filters = {
      keyword: this.searchQuery,
      city: '',
      startDate: this.fromDate,
      endDate: this.toDate,
      country: '',
      providerFirstName: '',
      isProductOnly: this.showProducts,
      price: this.selectedFilter === 'price' && !isNaN(Number(this.searchQuery)) ? Number(this.searchQuery) : undefined,
      discount: this.selectedFilter === 'discount' && !isNaN(Number(this.searchQuery)) ? Number(this.searchQuery) : undefined,
      sortBy: this.selectedFilter === 'country' || this.selectedFilter === 'city' || this.selectedFilter === 'providerFirstName' ? undefined : this.selectedFilter,
      sortDirection: this.sortOrder,
      page: this.currentPage,
      pageSize: this.itemsPerPage,
    };

    this.solutionService.getAllSolutions(filters).subscribe({
      next: (response: PagedResponse<SolutionCard>) => {
        this.solutions = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching solutions:', err);
        this.loading = false;
      },
    });
  }

  toggleView(showProducts: boolean): void {
    this.showProducts = showProducts;
    this.fetchSolutions();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchSolutions();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchSolutions();
    }
  }

  openSolutionDetails(solutionId: number): void {
    if (this.showProducts) {
      this.productManager.openProductDetails(solutionId);
    } else {
      this.serviceManager.openServiceDetails(solutionId);
    }
  }

  applySearch(): void {
    this.currentPage = 0;
    this.fetchSolutions();
  }
}
