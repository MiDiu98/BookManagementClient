import { Login } from './../_models/Login';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  currentUser: Login;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser.token);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.currentUser.token
        },
      });
    }
    return next.handle(req);
  }

}
