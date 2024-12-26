import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceManagerService } from '../../services/service-manager.service';
import { Service } from '../../models/service.model';
import { ServiceFiltersComponent } from '../service-filters/service-filters.component';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  combinedFilters: any = { name: '', filters: {} };
  services: Service[] = [];
  pageSize = 6;
  currentPage = 1;
  totalElements = 0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private serviceManagerService: ServiceManagerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.applyCombinedFilters();
  }

  filterServices(searchText: string): void {
    this.combinedFilters.name = searchText;
    this.currentPage = 1;
    this.applyCombinedFilters();
  }

  toggleFilters(): void {
    const dialogRef = this.dialog.open(ServiceFiltersComponent, { width: '25em' });

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
    this.serviceManagerService
      .searchAndFilter(filters, this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PagedResponse<Service>) => {
          this.services = response.content.slice(0, this.pageSize);
          this.totalElements = response.totalElements;
        },
        error: (err) => {
          console.error('Error fetching services:', err);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.applyCombinedFilters();
  }

  goToServiceDetails(serviceId: number): void {
    this.router.navigate(['/service', serviceId]);
  }

  editService(event: MouseEvent, serviceId: number): void {
    event.stopPropagation();
    this.router.navigate(['/service/edit', serviceId]);
  }

  deleteService(event: MouseEvent, serviceId: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this service?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.serviceManagerService.deleteService(serviceId).subscribe(() => {
          this.applyCombinedFilters();
        });
      }
    });
  }
}
