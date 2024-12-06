import { Component } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServiceManagerService } from '../../services/service-manager.service';

@Component({
  selector: 'app-favourite-services',
  templateUrl: './favourite-services.component.html',
  styleUrl: './favourite-services.component.css',
})
export class FavouriteServicesComponent {
  services: Service[] = [];

  constructor(
    private serviceService: ServiceManagerService,
  ) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe((data: Service[]) => {
      this.services = data;
    });
  }
}
