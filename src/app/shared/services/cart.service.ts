import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { CartProduct } from '../models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public getCart(): CartProduct[] {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  }

  public addToCart(cartProduct: CartProduct): Observable<any> {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartProduct);
    localStorage.setItem('cart', JSON.stringify(cart));

    // let subject = new Subject<CartProduct>();
    // if (localStorage.getItem('cart')) {
    //   subject.complete();
    // } else {
    //   subject.error(new Error('Thêm vào giỏ hàng không thành công!'));
    // }
    // return subject;
    let cartSub = new BehaviorSubject(new CartProduct);
    cartSub.next(Object.assign(cartSub.value, cart));
    cartSub.complete();
    return cartSub;
  }
}
