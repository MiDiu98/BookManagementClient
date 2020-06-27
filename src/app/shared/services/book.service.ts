import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { Constant } from '../constants/Constant';
import { Book } from '../models/book.model';


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

  public getBookNew() {
    return this.http.get<any>(Constant.BOOK_URL + '/enable?pageNo=0&pageSize=4&sortBy=updateAt&order=desc');
  }

  public getBookEnable() {
    return this.http.get<any>(Constant.BOOK_URL + '/enable?pageNo=0&pageSize=8&sortBy=title&order=asc');
  }

  public getBookByAdmin(enabled: boolean) {
    return this.http.get<any>(Constant.BOOK_URL + '/admin?enabled=' + enabled);
  }

  public getBookById(bookId: number): Observable<Book> {
    return this.http.get<any>(Constant.BOOK_URL + '/' + bookId);
  }

  public getMyBook() {
    return this.http.get<any>(Constant.BOOK_URL + '/my-books');
  }

  public createNewBook(title: string, author: string, description: string, image: string) {
    return this.http.post<any>(Constant.BOOK_URL, {title, author, description, image});
  }

  public updateBook(bookId: number, title: string, author: string, description: string, image: string) {
    return this.http.put<any>(Constant.BOOK_URL + '/' + bookId, {title, author, description, image});
  }

  public deleteBook(bookId: number) {
    return this.http.delete<any>(Constant.BOOK_URL + '/' + bookId);
  }

  public updateBookByAdmin(bookId: number, book: Book) {
    return this.http.put<any>(Constant.BOOK_URL + '/admin/' + bookId, book);
  }

  public searchBookByTitleOrAuthor(title: string, author: string) {
    return this.http.get<any>(Constant.BOOK_URL + '/find?title=' + title + '&author=' + author);
  }
}
