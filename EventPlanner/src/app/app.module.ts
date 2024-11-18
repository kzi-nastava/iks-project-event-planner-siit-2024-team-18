import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DetailsModule } from './details/details.module';
import { CardsModule } from './cards/cards.module';
import { HomePageModule } from './homepage/homepage.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DetailsModule,
    CardsModule,
    HomePageModule,
    AuthModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
