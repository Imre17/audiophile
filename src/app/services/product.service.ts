import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
   return this.db.list('/products').push(product)
  }

  getAll(): AngularFireList<Product[]> {
    return this.db.list('/products')
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId)
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product)
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove()
  }
}
