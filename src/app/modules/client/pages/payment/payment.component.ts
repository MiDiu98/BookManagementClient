import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderProducts: CartProduct[];

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder(): void {
    this.orderProducts = this.paymentService.getOrder();
  }

}
