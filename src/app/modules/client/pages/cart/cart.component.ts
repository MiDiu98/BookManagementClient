import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[];
  cartOrder: CartProduct[];
  chooseAll: boolean;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    this.cartOrder = [];
  }

  ngOnInit(): void {
    this.getCart();
  }

  private getCart(): void {
    this.cartProducts = this.cartService.getCart()
  }

  public goPayment(): void {
    this.router.navigate(['/payment']);
  }

  public isCheckAll(): void {
    this.chooseAll = !this.chooseAll;
    this.setStateAllItem(this.chooseAll);
  }

  private setStateAllItem(status: boolean) {
    this.cartProducts.forEach(item => item.status = status);
    this.cartOrder = status ? this.cartProducts : [];
  }

  public changeCart(index: number, item: CartProduct): void {
    item.status = !item.status;

    this.cartProducts.forEach(product => {
      if (product.productId === item.productId) {
        product.status = item.status;
      }
    })

    if (item.status === true) {
      this.cartOrder.push(item);
    } else if (item.status === false) {
      const indexOrder = this.cartOrder.findIndex(order => order === item);
      this.cartOrder.splice(indexOrder, 1);
    }
  }

  public deleteItem(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

}
