import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceManagerService } from '../../services/service-manager.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit {
  service: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private ServiceManagerService: ServiceManagerService
  ) {}

  ngOnInit(): void {
    const serviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.service = this.ServiceManagerService.getServiceById(serviceId);
  }
}
