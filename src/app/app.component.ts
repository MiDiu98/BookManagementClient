import { MatDialog } from '@angular/material/dialog';
import { Component, NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './shared/models/Login';
import { AuthenticationService } from './shared/services/authentication.service';
import { delay } from 'rxjs/operators';


export interface DialogData {
  animal: string;
  name: string;
}

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
  titleModal = 'Example Angular 8 Material Dialog';

  name: string;
  animal: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => {
          if (x != null) {
            this.currentUser = x;
            this.isLogin = true;

            (this.currentUser.roles).forEach(element => {
              if (element.match(`ROLE_ADMIN`)) {
                this.isAdmin = true;
              }
            });
          }
        }
      );
  }

  logout() {
      this.authenticationService.logout();
      location.replace('/');
  }
}
