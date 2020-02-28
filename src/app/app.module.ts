import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './application/employee-list/employee-list.component';
import { CheckoutComponent } from './application/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeListComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CheckoutService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
