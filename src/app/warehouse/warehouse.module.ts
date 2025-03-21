import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InventoryComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
