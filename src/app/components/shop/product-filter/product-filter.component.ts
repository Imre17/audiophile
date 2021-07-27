import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories;
  @Input('category') category;

  constructor(
    categoryService: CategoryService,
  ) { 
    this.categories = categoryService.getCategories().snapshotChanges()
     .pipe(map(cat => {
       return cat.map(c => ({key: c.payload.key, ...c.payload.val()}));
     }))
  }

  ngOnInit(): void {
  }

}
