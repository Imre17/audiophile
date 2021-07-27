import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    auth.user.subscribe(user => {
      if(!user) return;
  
        userService.save(user);

        let returnUrl = localStorage.getItem('user');
        if(!returnUrl) return;

          localStorage.removeItem('returnUrl')
          router.navigateByUrl(returnUrl)
              
      });
  }

}
