import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Warehouse Manager', 'Supplier', 'Customer'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
    canActivate: [AuthGuard],
    data: { roles: ['Warehouse Manager'] }
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
    canActivate: [AuthGuard],
    data: { roles: ['Supplier'] }
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard],
    data: { roles: ['Customer'] }
  },  
  // additional lazy-loaded modules for other roles here...
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
