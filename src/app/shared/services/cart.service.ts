import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { OrderProduct } from '../models/order-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: OrderProduct[];

  constructor() { }

  public addToCart(orderProduct: OrderProduct): Observable<any> {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cart.push(orderProduct);
    localStorage.setItem('cart', JSON.stringify(this.cart));

    let subject = new Subject();
    if (localStorage.getItem('cart')) {
      subject.complete();
    } else {
      subject.error(new Error('Thêm vào giỏ hàng không thành công!'));
    }
    return subject;
  }
}
