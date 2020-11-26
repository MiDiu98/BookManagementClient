import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  product: Product;
  index = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
        (params: Params) => {
          this.productId = params.id;
          console.log(this.productId);
        }
      );
    this.getBookById(this.productId);
  }

  public getBookById(id: number) {
    this.productService.getProductById(id).subscribe((res: Product) => {
      this.product = res;
      console.log(this.product);
    })
  }

  public addToCart() {
    this.router.navigate(['/cart']);
  }

}
