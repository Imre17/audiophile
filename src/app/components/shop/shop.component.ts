import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy  {
  
  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService,
    ) {
      productService.getAll().snapshotChanges().pipe(map(prod => {
        return prod.map(p => ({key: p.payload.key,...p.payload.val()}))
      })).subscribe((products:any ) => {
        this.products = products
      
        
        route.queryParamMap.subscribe(params => {
          this.category = params.get('category')
   
           this.filterProducts = (this.category) ? 
             this.products.filter(p => p.category === this.category) :
             this.products
        })
      })
     

   }

   async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
        .subscribe(cart => this.cart = cart);
   }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

   addToCart(product: Product ) {
    this.cartService.addToCart(product);
   }




}
