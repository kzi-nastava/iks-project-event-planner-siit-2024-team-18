import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ServiceManagerModule } from './service-manager/service-manager.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DetailsModule } from './details/details.module';
import { CardsModule } from './cards/cards.module';
import { HomePageModule } from './homepage/homepage.module';
import { AuthModule } from './auth/auth.module';
import { EventManagerModule } from './event-manager/event-manager.module';
import { ProductManagerModule } from './product-manager/product-manager.module';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { MaterialModule } from './infrastructure/material/material.module';
import { CategoryManagerComponent } from './category-manager/category-types/category-manager.component';
import { CategoryReviewComponent } from './category-manager/category-review/category-review.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './auth/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BudgetPlanningComponent,
    CategoryManagerComponent,
    CategoryReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceManagerModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    DetailsModule,
    CardsModule,
    HomePageModule,
    AuthModule,
    EventManagerModule,
    ProductManagerModule,
    MaterialModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
