import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {path:'admin', component:AdminLoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [RoleGuard]},
  {path: 'admin/orders/:id', component: OrderDetailsComponent, canActivate: [RoleGuard]},
  {path: 'admin/products', component: ProductsComponent, canActivate: [RoleGuard]},
  {path: 'admin/products/:id', component: EditProductComponent, canActivate: [RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
