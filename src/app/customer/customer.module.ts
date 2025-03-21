import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyOrdersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
