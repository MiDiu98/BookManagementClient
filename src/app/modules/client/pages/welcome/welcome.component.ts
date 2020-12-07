import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/shared/models/order-product.model';
import { Product } from 'src/app/shared/models/product.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private alertService: AlertifyService,
    ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      console.log(res);
      this.products = res;
      this.products.map((product: Product) => this.setProductCovers(product));
    })
  }

  private setProductCovers(product: Product): Product {
    product.covers = product.image.split(',');
    return product;
  }

  public addToCart(product: Product): void {
    let orderProducts = new OrderProduct({
      orderId: 0,
      productId: product.id,
      product: product.name,
      price: product.originPrice,
      quantity: 1
    });

    this.cartService.addToCart(orderProducts).subscribe(_ => {
      this.alertService.success('Đã thêm vào giỏ hàng!');
    })
  }

}
