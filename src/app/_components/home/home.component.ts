import { first } from 'rxjs/operators';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/Book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookNew: Book[] = [];
  books: Book[] = [];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBookEnabled();
    this.getBookNew();
  }

  public getBookEnabled() {
    this.bookService.getBookEnable()
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              this.books = data;
            }
          );
  }

  public getBookNew() {
    this.bookService.getBookNew().subscribe(
      data => {
        console.log(data);
        this.bookNew = data;
      }
    )
  }
}
