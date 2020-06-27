import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { BookService } from 'src/app/shared/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() {return this.bookForm.controls; }

  onSubmit() {

    if (this.bookForm.invalid) {
      return;
    }

    console.log(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value);
    this.createBook();
  }

  private createBook() {
    this.bookService.createNewBook(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value).subscribe(
      response => {
        console.log(response);
        this.alertify.success('Đã tạo mới một cuốn sách!');
        this.router.navigate(['/books/' + response.id]);
      },
      error => {
        this.alertify.error('Tạo mới sách không thành công, vui lòng thử lại!');
      }
    )
  }

  // private updateBook() {
  // this.bookService.updateBook(this.bookId, this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value).subscribe(
  //     response => {
  //       console.log(response);
  //       this.alertify.success('Cập nhật thành công!');
  //       this.router.navigate(['/books/' + response.id]);
  //     },
  //     error => {
  //       this.alertify.error('Cập nhật không thành công, vui lòng thử lại!');
  //     }
  //   )
  // }

  // private getBookById(bookId: number) {
  //   this.bookService.getBookById(bookId).subscribe(
  //     (data: Book) => {
  //       console.log(data);
  //       this.book = data;
  //     }
  //   )
  // }

  public onSubmitForm(value: any) {
    console.log('value', value);
  }

}
