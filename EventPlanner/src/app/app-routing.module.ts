import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './service-manager/services/services.component';
import { ServiceDetailsComponent } from './details/service-details/service-details.component';
import { CreateServiceComponent } from './service-manager/create-service/create-service.component';
import { EditServiceComponent } from './service-manager/edit-service/edit-service.component';
import { HomeComponent } from './homepage/home/home.component';
import { EventDetailsComponent } from './details/event-details/event-details.component';
import { ProductServiceDetailsComponent } from './details/product-service-details/product-service-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { InviteScreenComponent } from './invite-screen/invite-screen.component';
import { InvitedEventsComponent } from './invited-events/invited-events.component';
import { ServiceReservationComponent } from './service-manager/service-reservation/service-reservation.component';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'event/create/invites', component: InviteScreenComponent },
  { path: 'invited-events', component: InvitedEventsComponent },
  { path: 'product-service-details/:id', component: ProductServiceDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'budget-planning', component: BudgetPlanningComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service/create', component: CreateServiceComponent },
  { path: 'service/edit/:id', component: EditServiceComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'service/:id/reserve', component: ServiceReservationComponent },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
