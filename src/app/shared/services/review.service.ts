import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';
import { Constant } from '../constants/Constant';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient) { }

  getAllReviewsByProduct(product: number) {
    return this.http.get<any>(`${Constant.API_URL}/reviews/products/${product}`);
  }

  getReviewById(reviewId: number) {
    return this.http.get<any>(`${Constant.API_URL}/reviews/${reviewId}`);
  }

  postComment(review: Review) {
    return this.http.post<any>(`${Constant.API_URL}/reviews/users/${review.userId}/products/${review.productId}`, review);
  }

  updateComment(review: Review) {
    return this.http.put<any>(`${Constant.API_URL}/reviews/users/${review.userId}/review/${review.id}`, review);
  }

  deleteComment(review: Review) {
    return this.http.delete<any>(`${Constant.API_URL}/reviews/users/${review.userId}/review/${review.id}`);
  }
}
