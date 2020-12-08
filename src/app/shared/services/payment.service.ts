import { Injectable } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  public getOrder(): CartProduct[] {
    return JSON.parse(localStorage.getItem('payment'));
  }
}
