import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app.user';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  @ViewChild('burger') burger: ElementRef
  @ViewChild('lists') lists: ElementRef
  @ViewChildren('line') burgerLines: QueryList<ElementRef>
  @ViewChildren('a') anchores: QueryList<ElementRef>
  appUser: AppUser;
  cart: Observable<ShoppingCart>;
  lines = [1, 2, 3];


  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService
    ) {}
  
  async ngOnInit() {
    this.auth.appUser.subscribe(appUser => this.appUser = appUser)
    this.cart = await this.cartService.getCart()

  }

  login() {
    this.auth.login()
  }

  logout() {
    this.auth.logout()
  }

  ngAfterViewInit() {
    this.burgerLines.forEach(line => {
      
      this.burger.nativeElement.addEventListener('click', () => {
        if(!line.nativeElement.classList.contains('toggle')) {
          line.nativeElement.classList.add('toggle')
          line.nativeElement.style.transition = 'all 0.2s ease-in-out'
          this.lists.nativeElement.classList.add('active')
        } else {
          line.nativeElement.classList.remove('toggle')
          this.lists.nativeElement.classList.remove('active')
        }
      })

      this.anchores.forEach(a => {
        a.nativeElement.addEventListener('click', () => {
          this.lists.nativeElement.classList.remove('active')
          line.nativeElement.classList.remove('toggle')
        })
      })
    })
    
  }
}
