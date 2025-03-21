import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { DeliveryStatusComponent } from './delivery-status/delivery-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'purchase-orders', pathMatch: 'full' },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
  { path: 'delivery-status', component: DeliveryStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {}
