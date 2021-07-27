import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeadphonesComponent } from './components/headphones/headphones.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { EarphonesComponent } from './components/earphones/earphones.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/admin-products/product-form/product-form.component';
import { ProductFilterComponent } from './components/shop/product-filter/product-filter.component';
import { ProductImageComponent } from './components/shop/product-image/product-image.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessfullComponent } from './components/order-successfull/order-successfull.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    HeadphonesComponent,
    SpeakersComponent,
    EarphonesComponent,
    ShopComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductImageComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    OrderSuccessfullComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
