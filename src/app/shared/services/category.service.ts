import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../constants/Constant';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllParentCategories(): Observable<Category[]> {
    return this.http.get<Category[]> (`${Constant.API_URL}/categories/root-categories`);
  }

  public getChildCategories(id: number): Observable<Category[]> {
    return this.http.get<Category[]> (`${Constant.API_URL}/categories/parent-category/${id}`);
  }
}
