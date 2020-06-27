import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {
  enabledBooks: Book[] = [];
  disabledBooks: Book[] = [];
  showEnabledBook = false;
  showDisabledBook = true;

  constructor(
    private bookService: BookService,
    private alertifyService: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.getEnabledBook();
    this.getDisabledBook();
  }

  getDisabledBook() {
    this.bookService.getBookByAdmin(false).subscribe(response => {
      this.disabledBooks = response;
    })
  }

  getEnabledBook() {
    this.bookService.getBookByAdmin(true).subscribe(response => {
      this.enabledBooks = response;
    });
  }

  onDisabled(bookId: number, book: Book, event) {
      const checked = event.target.checked;
      if (!checked) {
        book.enabled = false;
        this.bookService.updateBookByAdmin(bookId, book).subscribe(
          data => {
            this.alertifyService.success('Cập nhật trạng thái thành công');
            this.getEnabledBook();
            this.getDisabledBook();
          },
          error => {
            this.alertifyService.error('Cập nhật trạng thái không thành công');
          }
        )
      }
    }

    onEnabled(bookId: number, book: Book, event) {
      const checked = event.target.checked;
      if (checked) {
        book.enabled = true;
        this.bookService.updateBookByAdmin(bookId, book).subscribe(
          data => {
            this.alertifyService.success('Cập nhật trạng thái thành công');
            this.getEnabledBook();
            this.getDisabledBook();
          },
          error => {
            this.alertifyService.error('Cập nhật trạng thái không thành công');
          }
        )
      }
    }

}
