import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  productId: Product[] = []
  constructor(private db: AngularFireDatabase) { 
  }


  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
        .pipe(map((x)=> (x) ? new ShoppingCart(( x as any).items):(x as any) ));
  }

   private getItem(cartId: string, productId: string) {
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
    }

  private async getOrCreateCartId():Promise<string>{
   
    let cartId = localStorage.getItem('cartId');
      if(cartId) return cartId

      let result = await this.create();
      localStorage.setItem('cartId', result.key)
      return result.key

  }

    addToCart(product: Product) {
      this.updateItem(product, 1)
    }
    
    removeFromCart(product: Product) {
      this.updateItem(product, -1);
    }

    private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.key);

    item.snapshotChanges().pipe(take(1)).subscribe((action) => {
      if (action.payload.exists()) {
          let quantity = action.payload.exportVal().quantity + change;
          
          if (quantity === 0) item.remove();
          else
              item.update({
                  title: product.title,
                  imgUrl: product.imgUrl,
                  price: product.price,
                  quantity: quantity
              });
      } else {
          item.update({ product: product, quantity: 1 });
      }
    });
  }
}
