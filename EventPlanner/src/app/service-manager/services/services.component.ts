import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceManagerService } from '../../services/service-manager.service';
import { Service } from '../../models/service.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceFiltersComponent } from '../service-filters/service-filters.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';

@Component({
  selector: 'app-create-service',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];
  paginatedServices: Service[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private serviceManagerService: ServiceManagerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.serviceManagerService.getServices().subscribe((data: Service[]) => {
      this.services = data;
      this.filteredServices = [...this.services];
      this.paginatedServices = this.filteredServices.slice(0, 6);
    });
  }

  filterServices(searchText: string): void {
    this.serviceManagerService
      .searchAndFilter(searchText)
      .subscribe((data: Service[]) => {
        this.services = data;
        this.filteredServices = [...this.services];
        this.paginatedServices = this.filteredServices.slice(0, 6);
        if (this.paginator) {
          this.paginator.firstPage();
        }
      });
  }
  
    // this.filteredServices = this.services.filter(service =>
    //   service.name.toLowerCase().includes(searchText.toLowerCase())
    // );
    // this.paginatedServices = this.filteredServices.slice(0, 6);
    // if (this.paginator) {
    //   this.paginator.firstPage();
    // }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedServices = this.filteredServices.slice(startIndex, endIndex);
  }

  goToServiceDetails(serviceId: number): void {
    this.router.navigate(['/service', serviceId]);
  }

  toggleFilters(): void {
    const dialogRef = this.dialog.open(ServiceFiltersComponent, {
      width: '25em',
    });
  
    dialogRef.afterClosed().subscribe(filters => {
      if (filters) {
        this.applyFilters(filters);
      }
    });
  }

  applyFilters(filters: any): void {
    console.log(filters);
    this.filteredServices = this.services.filter(service => {
      // const matchesCategory = !filters.category || service.category === filters.category;
      // const matchesEventType = !filters.eventType || service.eventType === filters.eventType;
      // const matchesPublic = !filters.public || service.isPublic === filters.public;
      const matchesMinPrice = filters.minPrice === 0 || service.price >= filters.minPrice;
      const matchesMaxPrice = filters.maxPrice === 0 || service.price <= filters.maxPrice;
      return matchesMinPrice && matchesMaxPrice;
    });
  
    this.paginatedServices = this.filteredServices.slice(0, 6);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  createService() {
    console.log('Create button clicked');
  }

  editService(event: MouseEvent, serviceId: number): void {
    event.stopPropagation();
    this.router.navigate(['/service/edit', serviceId]);
  }

  deleteService(event: MouseEvent, serviceId: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '25em',
      data: { message: 'Are you sure you want to delete this service?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serviceManagerService.deleteService(serviceId);

        this.serviceManagerService.getServices().subscribe((data: Service[]) => {
          this.services = data;
        });
        this.filteredServices = [...this.services];
        this.paginatedServices = this.filteredServices.slice(0, 6);
  
        if (this.paginator) {
          this.paginator.firstPage();
        }      
      }
    });
  }
}
