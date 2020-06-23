import { Constant } from './../../constants/Constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<any>(Constant.USER_URL + '?enabled=true');
  }

}
