import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

  getQty() {
    if(!this.shoppingCart) return 0
    let item = this.shoppingCart.itemsMap[this.product.key]
    return item ? item.quantity : 0;
  }
}
