import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/admin-products/product-form/product-form.component';
import { EarphonesComponent } from './components/earphones/earphones.component';
import { HeadphonesComponent } from './components/headphones/headphones.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'headphones', component: HeadphonesComponent },
  { path: 'speakers', component: SpeakersComponent },
  { path: 'earphones',component: EarphonesComponent },
  { path: 'shop',component: ShopComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { 
    path: 'admin/products/new',
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'admin/products/:id',
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  { 
    path: 'admin/products',
    component: AdminProductsComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
