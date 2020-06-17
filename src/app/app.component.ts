import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { Login } from './_models/Login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore';
  currentUser: Login;
  isLogin = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => {
          this.currentUser = x;
          this.isLogin = true;
        }
      );
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
