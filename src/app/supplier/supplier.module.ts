import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PurchaseOrdersComponent,
    DeliveryStatusComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
