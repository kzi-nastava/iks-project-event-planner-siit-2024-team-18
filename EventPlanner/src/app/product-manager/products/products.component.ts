import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductManagerService } from '../../services/product-manager.service';
import { Product } from '../../models/product.model';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  combinedFilters: any = { name: '', filters: {} };
  products: Product[] = [];
  pageSize = 6;
  currentPage = 1;
  totalElements = 0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private productManagerService: ProductManagerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.applyCombinedFilters();
  }

  filterProducts(searchText: string): void {
    this.combinedFilters.name = searchText;
    this.currentPage = 1;
    this.applyCombinedFilters();
  }

  toggleFilters(): void {
    const dialogRef = this.dialog.open(ProductFiltersComponent, { width: '25em' });

    dialogRef.afterClosed().subscribe((filters) => {
      if (filters) {
        this.combinedFilters.filters = filters;
        this.currentPage = 1;
        this.applyCombinedFilters();
      }
    });
  }

  private applyCombinedFilters(): void {
    const filters = { ...this.combinedFilters.filters, name: this.combinedFilters.name };
    this.productManagerService
      .searchAndFilter(filters, this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PagedResponse<Product>) => {
          this.products = response.content;
          this.totalElements = response.totalElements;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.applyCombinedFilters();
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  editProduct(event: MouseEvent, productId: number): void {
    event.stopPropagation();
    this.router.navigate(['/product/edit', productId]);
  }

  deleteProduct(event: MouseEvent, productId: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this product?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productManagerService.deleteProduct(productId).subscribe(() => {
          this.applyCombinedFilters();
        });
      }
    });
  }
}
