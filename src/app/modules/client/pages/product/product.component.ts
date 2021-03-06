import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { OrderProduct } from 'src/app/shared/models/order-product.model';
import { Product } from 'src/app/shared/models/product.model';
import { Question } from 'src/app/shared/models/question.model';
import { Review } from 'src/app/shared/models/review.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { ReviewService } from 'src/app/shared/services/review.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId: number;
  product: Product;
  index = 0;
  quantityProduct = 1;
  reviews: Review[];
  questions: Question[];
  question: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private alertService: AlertifyService,
    private reviewService: ReviewService,
    private questionService: QuestionService
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

  async getBookById(id: number) {
    await this.productService.getProductById(id).subscribe((res: Product) => {
      console.log(this.product);
      this.product = res;
      this.getAllReviewByProductId(this.product.id);
      this.getAllQuestionsByProductId(this.product.id);
    })
  }

  getAllReviewByProductId(productId: number): void {
    this.reviewService.getAllReviewsByProduct(productId).subscribe((reviews: Review[]) => {
      this.reviews = reviews;
    })
  }

  getAllQuestionsByProductId(productId: number): void {
    this.questionService.getAllQuestionsByProduct(productId).subscribe((questions: Question[]) => {
      this.questions = questions;
      console.log(this.questions);
    })
  }

  public addToCart(product: Product): void {
    let cartProduct = new CartProduct({
      cartId: 0,
      productId: product.id,
      productName: product.name,
      productCover:  product.covers[0],
      productDescription: product.description,
      price: product.originPrice,
      quantity: this.quantityProduct,
      status: false
    });

    this.cartService.addToCart(cartProduct).subscribe(_ => {
      this.alertService.success('Đã thêm vào giỏ hàng!');
      window.location.reload();
    })
  }

  public addQuestion(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.question);

    if (!this.question) {
      this.alertService.warning('Bạn chưa nhập câu hỏi.');
      return;
    }
    else if (!user) {
      this.alertService.warning('Bạn cần đăng nhập để đặt câu hỏi.');
      return;
    }

    let question = new Question({question: this.question, createAt: new Date(), userId: user.id, productId: this.product.id});
    this.questionService.postQuestion(question).subscribe((question: Question) => {
      this.questions.unshift(question);
      this.question = null;
    })
  }

}
