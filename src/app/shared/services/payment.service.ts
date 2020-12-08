import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../constants/Constant';
import { CartProduct } from '../models/cart-product.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  public getOrder(): CartProduct[] {
    return JSON.parse(localStorage.getItem('payment'));
  }

  public payment(order: Order): Observable<Order> {
    return this.http.post<Order>(`${Constant.API_URL}/orders/user/${order.userId}`, order);
  }

}
