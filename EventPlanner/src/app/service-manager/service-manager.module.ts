import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceFiltersComponent } from './service-filters/service-filters.component';
import { ServiceReservationComponent } from './service-reservation/service-reservation.component';
import { FavouriteServicesComponent } from './favourite-services/favourite-services.component';

@NgModule({
  declarations: [
    ServicesComponent,
    CreateServiceComponent,
    EditServiceComponent,
    ServiceFiltersComponent,
    ServiceReservationComponent,
    FavouriteServicesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ServicesComponent,
    FavouriteServicesComponent
  ],
})
export class ServiceManagerModule {}
