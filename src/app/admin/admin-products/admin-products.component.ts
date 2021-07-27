import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy{


  products: Product[];
  filterProducts: any[]
  subscription: Subscription;

  constructor(private productService: ProductService,) {
      this.subscription = this.productService.getAll().snapshotChanges()
      .pipe(map(prod => {
        return prod.map(p => ({key: p.payload.key, ...p.payload.val()}))
      })).subscribe((p:any) => this.filterProducts = this.products = p)
              
        }
        
  ngOnInit(): void {  
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filterProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
                                    this.products

  }

}
