import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Constant } from '../constants/Constant';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private currentUserSubject: BehaviorSubject<Login>
  public currentUser: Observable<Login>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getProductNew() {
    return this.http.get<any>(Constant.PRODUCT_URL + '/enable?pageNo=0&pageSize=4&sortBy=updateAt&order=desc');
  }

  public getProductEnable(pageNo: number = 0, pageSize: number = 4, sortBy: string = 'title', order: string = 'asc') {
    return this.http.get<any>(Constant.PRODUCT_URL + `/enable?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`);
  }

  public getProductByAdmin(enabled: boolean, pageNo: number = 0, pageSize: number = 4, sortBy: string = 'id', order: string = 'asc') {
    return this.http.get<any>(Constant.ADMIN_PRODUCT_URL + `?enabled=${enabled}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`);
  }

  public getMyProductById(bookId: number): Observable<Product> {
    return this.http.get<any>(Constant.PRODUCT_URL + '/my-books/' + bookId);
  }

  public getProductById(bookId: number): Observable<Product> {
    return this.http.get<any>(Constant.PRODUCT_URL + '/' + bookId);
  }

  public getMyProduct() {
    return this.http.get<any>(Constant.PRODUCT_URL + '/my-books');
  }

  public createNewProduct(title: string, author: string, description: string, image: string) {
    return this.http.post<any>(Constant.PRODUCT_URL, {title, author, description, image});
  }

  public updateProduct(bookId: number, title: string, author: string, description: string, image: string) {
    return this.http.put<any>(Constant.PRODUCT_URL + '/' + bookId, {title, author, description, image});
  }

  public deleteProduct(bookId: number) {
    return this.http.delete<any>(Constant.PRODUCT_URL + '/' + bookId);
  }

  public deleteProductByAdmin(bookId: number) {
    return this.http.delete<any>(Constant.ADMIN_PRODUCT_URL + '/' + bookId);
  }

  public updateProductByAdmin(bookId: number, book: Product) {
    return this.http.put<any>(Constant.ADMIN_PRODUCT_URL + '/' + bookId, book);
  }

  public searchProductByTitleOrAuthor(title: string, author: string) {
    return this.http.get<any>(Constant.PRODUCT_URL + '/find?title=' + title + '&author=' + author);
  }
}
