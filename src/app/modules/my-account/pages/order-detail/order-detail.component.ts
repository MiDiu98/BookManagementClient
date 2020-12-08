import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId: number;
  order: Order;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params.id;
        console.log(this.orderId);
      }
    );
    this.getOrderById(this.orderId);
  }

  public getOrderById(id: number): void {
    this.orderService.getById(id).subscribe((order: Order) => {
      this.order = order;
      console.log(this.order);
    });
  }

  public cancelOrder(): void {

  }

}
