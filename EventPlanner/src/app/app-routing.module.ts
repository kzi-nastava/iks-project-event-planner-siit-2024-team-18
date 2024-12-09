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
import { BudgetPlanningComponent } from './budget-manager/budget-planning/budget-planning.component';
import { EventTypesComponent } from './event-type-manager/event-types/event-types.component';
import { CategoryManagerComponent } from './category-manager/category-types/category-manager.component';
import { CategoryReviewComponent } from './category-manager/category-review/category-review.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'event/create/invites', component: InviteScreenComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'invited-events', component: InvitedEventsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'budget-planning', component: BudgetPlanningComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']}},
  { path: 'service/create', component: CreateServiceComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'service/edit/:id', component: EditServiceComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'service/:id/reserve', component: ServiceReservationComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']} },
  { path: 'event-types', component: EventTypesComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'categories', component: CategoryManagerComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'categories/review', component: CategoryReviewComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
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
