import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TopFiveEventsComponent } from './sections/top-five-events/top-five-events.component';
import { AllEventsComponent } from './sections/all-events/all-events.component';
import { TopFiveProductsServicesComponent } from './sections/top-five-products-services/top-five-products-services.component';
import { AllProductsServicesComponent } from './sections/all-products-services/all-products-services.component';

import { CardsModule } from '../cards/cards.module';
import { DetailsModule } from '../details/details.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    TopFiveEventsComponent,
    AllEventsComponent,
    TopFiveProductsServicesComponent,
    AllProductsServicesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardsModule,
    DetailsModule
  ],
  exports: [
    HomeComponent,
    TopFiveEventsComponent,
    AllEventsComponent,
    TopFiveProductsServicesComponent,
    AllProductsServicesComponent
  ]
})
export class HomePageModule { }
