import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { EventDetailsComponent } from './details/event-details/event-details.component';
import { ProductServiceDetailsComponent } from './details/product-service-details/product-service-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'product-service-details/:id', component: ProductServiceDetailsComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }