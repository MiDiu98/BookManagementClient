import { Constant } from './../../constants/Constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient) { }

  getAllComment(bookId: number) {
    return this.http.get<any>(Constant.COMMENT_URL + '/' + bookId);
  }

  postComment(bookId: number, message: string) {
    return this.http.post<any>(Constant.COMMENT_URL + '/' + bookId, {message} );
  }
}
