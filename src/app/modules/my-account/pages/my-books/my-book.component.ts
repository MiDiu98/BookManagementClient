import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';

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
    this.router.navigate(['/my-account/update-book/' + bookId]);
  }

  public deleteBook(bookId: number) {
    this.alertify.confirm('Delete this book, are you sure?', () => {
      this.bookService.deleteBook(bookId).subscribe(
        response => {
          this.alertify.success('Deleted');
          this.getMyBook();
        },
        error => {
          this.alertify.error('Delete fail');
        }
      )
    });
  }

}
