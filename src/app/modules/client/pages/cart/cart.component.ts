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

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  private getCart(): void {
    this.cartProducts = this.cartService.getCart()
    console.log(this.cartProducts);
  }

  goPayment() {
    this.router.navigate(['/payment']);
  }

}
