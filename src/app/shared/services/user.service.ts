import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Constant } from '../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getEnabledUser(): Observable<User[]> {
    return this.http.get<any>(Constant.USER_URL + '/enabled');
  }

  public getUserByAdmin(enabled: boolean, pageNo: number = 0, pageSize: number = 4, sortBy: string = 'id', order: string = 'asc') {
    return this.http.get<any>(Constant.ADMIN_USER_URL + `?enabled=${enabled}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`);
  }

  public updateUserByAdmin(userId: number, user: User) {
    return this.http.put<any>(Constant.ADMIN_USER_URL + '/' + userId, user);
  }

  public delete(userId: number) {
    return this.http.delete<any>(Constant.USER_URL + '/' + userId);
  }

  public deleteByAdmin(userId: number) {
    return this.http.delete<any>(Constant.ADMIN_USER_URL + '/' + userId);
  }

}
