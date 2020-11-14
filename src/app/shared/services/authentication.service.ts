import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Constant } from '../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  constructor(private http: HttpClient) {
      this.currentUserSubject =  new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(Constant.LOGIN_URL, {email, password})
              .pipe(map(login => {
                if (login.token) {
                  localStorage.setItem('currentUser', JSON.stringify(login));
                  this.currentUserSubject.next(login);
                }
                return login;
              }));
  }

  register(email: string, password: string, firstname: string, lastname: string) {
    return this.http.post<any>(Constant.REGISTER_URL, {email, password, firstname, lastname});
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
