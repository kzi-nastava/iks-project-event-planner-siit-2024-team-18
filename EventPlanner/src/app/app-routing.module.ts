import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './service-manager/services/services.component';
import { ServiceDetailsComponent } from './details/service-details/service-details.component';
import { CreateServiceComponent } from './service-manager/create-service/create-service.component';
import { EditServiceComponent } from './service-manager/edit-service/edit-service.component';
import { HomeComponent } from './homepage/home/home.component';
import { EventDetailsComponent } from './details/event-details/event-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { InviteScreenComponent } from './event-manager/invite-screen/invite-screen.component';
import { InvitedEventsComponent } from './event-manager/invited-events/invited-events.component';
import { ServiceReservationComponent } from './service-manager/service-reservation/service-reservation.component';
import { ProductDetailsComponent } from './details/product-details/product-details.component';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { CreateEventComponent } from './event-manager/create-event/create-event.component';
import { EditEventComponent } from './event-manager/edit-event/edit-event.component';
import { EventsComponent } from './event-manager/events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events/create/invites', component: InviteScreenComponent },
  { path: 'events/create', component: CreateEventComponent},
  { path: 'invited-events', component: InvitedEventsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/create/budget-planning', component: BudgetPlanningComponent },
  { path: 'events/edit/:id', component: EditEventComponent },
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
