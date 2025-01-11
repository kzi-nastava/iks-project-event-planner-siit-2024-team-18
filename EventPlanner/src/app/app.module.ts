import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ServiceManagerModule } from './service-manager/service-manager.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CardsModule } from './cards/cards.module';
import { HomePageModule } from './homepage/homepage.module';
import { AuthModule } from './auth/auth.module';
import { EventManagerModule } from './event-manager/event-manager.module';
import { MaterialModule } from './infrastructure/material/material.module';
import { UserManagerModule } from './user-manager/user-manager.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventTypeManagerModule } from './event-type-manager/event-type-manager.module';
import { CategoryManagerModule } from './category-manager/category-manager.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './auth/interceptor';
import { BudgetManagerModule } from './budget-manager/budget-manager.module';
import { DetailsModule } from './details/details.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
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
    EventTypeManagerModule,
    CategoryManagerModule,
    BudgetManagerModule,
    MaterialModule,
    UserManagerModule,
    FullCalendarModule,
    ChatModule,
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
