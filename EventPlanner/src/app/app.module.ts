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
import { InviteScreenComponent } from './invite-screen/invite-screen.component';
import { InvitedEventsComponent } from './invited-events/invited-events.component';
import { ServiceReservationComponent } from './service-manager/service-reservation/service-reservation.component';
import { BudgetPlanningComponent } from './budget-planning/budget-planning.component';
import { MaterialModule } from './infrastructure/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    InviteScreenComponent,
    InvitedEventsComponent,
    ServiceReservationComponent,
    BudgetPlanningComponent,
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
    MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
