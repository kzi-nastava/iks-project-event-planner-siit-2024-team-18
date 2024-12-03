import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../models/service.model';
import { ServiceManagerService } from '../../services/service-manager.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  serviceId!: number;
  service!: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceManager: ServiceManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serviceId = +id;
      this.fetchServiceDetails(this.serviceId);
    } else {
      this.router.navigate(['']);
    }
  }

  fetchServiceDetails(serviceId: number): void {
    this.service = this.serviceManager.getServiceById(serviceId);
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
