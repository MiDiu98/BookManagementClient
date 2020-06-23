import { Book } from './../../_models/Book';
import { BookService } from './../../_services/book.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './../../_services/alertify.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
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

}
