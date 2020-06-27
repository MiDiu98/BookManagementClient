import { Component, NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './shared/models/Login';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore';
  currentUser: Login;
  isLogin = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => {
          if (x != null) {
            this.currentUser = x;
            this.isLogin = true;

            const jwt = x.token;
            const jwtData = jwt.split('.')[1];
            const decodedJwtJsonData = window.atob(jwtData);

            if (JSON.stringify(decodedJwtJsonData).match('(.*)ROLE_ADMIN(.*)') != null) {
              this.isAdmin = true;
            }
          }
        }
      );
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/authentication/login']);
  }
}
