import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceManagerService } from '../../services/service-manager.service';  // Use ServiceManagerService
import { Service } from '../../models/service.model';  // Use Service model

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service!: Service;

  constructor(
    private route: ActivatedRoute,
    private serviceManager: ServiceManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.fetchServiceDetails(id);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  fetchServiceDetails(serviceId: number): void {
    this.serviceManager.getServiceById(serviceId).subscribe({
      next: (data: Service) => {
        this.service = data;
      },
      error: (err) => {
        console.error('Failed to fetch service details:', err);
        this.router.navigate(['']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
