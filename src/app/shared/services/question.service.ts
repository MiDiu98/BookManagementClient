import { Question } from './../models/question.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient) { }

  getAllQuestionsByProduct(product: number) {
    return this.http.get<any>(`${Constant.API_URL}/questions/products/${product}`);
  }

  getQuestionById(questionId: number) {
    return this.http.get<any>(`${Constant.API_URL}/questions/${questionId}`);
  }

  postQuestion(question: Question) {
    return this.http.post<any>(`${Constant.API_URL}/questions`, question);
  }

  updateQuestion(question: Question) {
    return this.http.put<any>(`${Constant.API_URL}/questions/${question.id}`, question);
  }

  deleteQuestion(question: Question) {
    return this.http.delete<any>(`${Constant.API_URL}/questions/${question.id}`);
  }
}
