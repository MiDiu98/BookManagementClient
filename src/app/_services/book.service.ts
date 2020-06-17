import { Book } from './../_models/Book';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constant } from './../../constants/Constant';
import { Injectable } from '@angular/core';
import { Login } from '../_models/Login';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private currentUserSubject: BehaviorSubject<Login>
  public currentUser: Observable<Login>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getBookNew() {
    return this.http.get<any>(Constant.BOOK_URL + '/enable?pageNo=0&pageSize=4&sortBy=updateAt&order=desc');
  }

  getBookEnable() {
    return this.http.get<any>(Constant.BOOK_URL + '/enable?pageNo=0&pageSize=4&sortBy=title&order=asc');
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<any>(Constant.BOOK_URL + '/' + bookId);
  }
}
