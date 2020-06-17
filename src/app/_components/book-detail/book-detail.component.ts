import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/Book';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId = 0;
  book: Book;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.bookId = params.bookId;
      }
    );
    console.log(this.bookId);

    this.getBookById(this.bookId);
  }

  getBookById(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(
      (data: Book) => {
        console.log(data);
        this.book = data;
      }
    )
  }

}
