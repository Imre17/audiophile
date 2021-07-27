import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.component.html',
  styleUrls: ['./order-successfull.component.scss']
})
export class OrderSuccessfullComponent implements OnInit {

  @Input('cart') shoppingCart: ShoppingCart

  constructor() { }

  ngOnInit(): void {
  }

  return() {
    return this.shoppingCart.items[0]
  }
}
