import { AlertifyService } from './../../_services/alertify.service';
import { Book } from './../../_models/Book';
import { BookService } from './../../_services/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {
  myBooks: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private alertify: AlertifyService
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

  public updateBook(bookId: number) {
    this.router.navigate(['/update/' + bookId]);
  }

  public deleteBook(bookId: number) {
    this.alertify.confirm('Bạn có chắc muốn xóa không?', () => {
      this.bookService.deleteBook(bookId).subscribe(
        response => {
          this.alertify.success('Xóa thành công');
          this.getMyBook();
        },
        error => {
          this.alertify.error('Xóa không thành công');
        }
      )
    });
  }

}
