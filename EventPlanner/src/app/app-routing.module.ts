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
import { ServiceReservationComponent } from './service-manager/service-reservation/service-reservation.component';
import { ProductDetailsComponent } from './details/product-details/product-details.component';
import { EventsComponent } from './event-manager/events/events.component';
import { CreateEventComponent } from './event-manager/create-event/create-event.component';
import { EditEventComponent } from './event-manager/edit-event/edit-event.component';
import { EventTypesComponent } from './event-type-manager/event-types/event-types.component';
import { CategoryManagerComponent } from './category-manager/category-types/category-manager.component';
import { CategoryReviewComponent } from './category-manager/category-review/category-review.component';
import { UserProfileComponent } from './user-manager/user-profile/user-profile.component';
import { EditProfileComponent } from './user-manager/edit-profile/edit-profile.component';
import { BudgetPlanningComponent } from './budget-manager/budget-planning/budget-planning.component';
import { AuthGuard } from './auth/auth.guard';
import { PurchasedSolutionDetailsComponent } from './budget-manager/purchased-solution-details/purchased-solution-details.component';
import { FastRegistrationComponent } from './auth/fast-registration/fast-registration.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { PricelistComponent } from './details/pricelist/pricelist.component';
import { OtherUserProfileComponent } from './user-manager/other-user-profile/other-user-profile.component';
import { ReportsComponent } from './user-manager/reports/reports.component';
import { CommentRequestsComponent } from './user-manager/comment-requests/comment-requests.component';
import { ChatComponent } from './chat/chat/chat.component';
import { EditProductComponent } from './product-manager/edit-product/edit-product.component';
import { CreateProductComponent } from './product-manager/create-product/create-product.component';
import { ProductsComponent } from './product-manager/products/products.component';
import { AgendaComponent } from './agenda-manager/agenda/agenda.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'events/create/invites/:id', component: InviteScreenComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'fast-register', component: FastRegistrationComponent },
  { path: 'events/edit/budget-planning/:id', component: BudgetPlanningComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'events/edit/budget-planning/:id/details', component: PurchasedSolutionDetailsComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'events/edit/agenda/:id', component: AgendaComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']}},
  { path: 'service/create', component: CreateServiceComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'service/edit/:id', component: EditServiceComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']}},
  { path: 'product/create', component: CreateProductComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']} },
  { path: 'pricelist', component: PricelistComponent, canActivate: [AuthGuard], data: {role: ['SERVICE_PRODUCT_PROVIDER']}},
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'events/create', component: CreateEventComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'events/edit/:id', component: EditEventComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']}},
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'users/profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER', 'SERVICE_PRODUCT_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER']}},
  { path: 'users/profile/edit', component: EditProfileComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER', 'SERVICE_PRODUCT_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER']}},
  { path: 'users/profile/:id', component: OtherUserProfileComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER', 'SERVICE_PRODUCT_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER']}},
  { path: 'service/:id/reserve', component: ServiceReservationComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER']} },
  { path: 'event-types', component: EventTypesComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'categories', component: CategoryManagerComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'categories/review', component: CategoryReviewComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'comments', component: CommentRequestsComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']} },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER', 'SERVICE_PRODUCT_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER']} },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard], data: {role: ['EVENT_ORGANIZER', 'SERVICE_PRODUCT_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER']} },
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
