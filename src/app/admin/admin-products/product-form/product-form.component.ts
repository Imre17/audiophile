import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories: Observable<any[]>;
  product: any = {};
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories = this.categoryService.getCategories().snapshotChanges()
      .pipe(map(cat => {
        return cat.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }))

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p)
   }

  ngOnInit(): void {
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }
  delete() {
    if(!confirm('Are you sure you want to delete this prod?')) return;
      
    this.productService.delete(this.id)
    this.router.navigate(['/admin/products'])
  }


}
