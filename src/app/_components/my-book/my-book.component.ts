import { Book } from './../../_models/Book';
import { BookService } from './../../_services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {
  myBooks: Book[] = [];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getMyBook();
  }

  getMyBook() {
    this.bookService.getMyBook().subscribe(
      data => {
        console.log(data);
        this.myBooks = data;
      }
    )
  }
}
