import { Book } from './../../_models/Book';
import { BookService } from './../../_services/book.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './../../_services/alertify.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId = 0;
  book: Book;

  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.bookId = params.bookId;
      }
    );
    this.getBookById(this.bookId);
  }

  get f() {return this.bookForm.controls; }

  onSubmit() {

    if (this.bookForm.invalid) {
      return;
    }

    console.log(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value);
    this.updateBook();
  }

  private updateBook() {
  this.bookService.updateBook(this.bookId, this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value).subscribe(
      response => {
        console.log(response);
        this.alertify.success('Cập nhật thành công!');
        this.router.navigate(['/books/' + response.id]);
      },
      error => {
        this.alertify.error('Cập nhật không thành công, vui lòng thử lại!');
      }
    )
  }

  private getBookById(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(
      (data: Book) => {
        console.log(data);
        this.book = data;
        this.bookForm = this.formBuilder.group({
          title: [this.book.title, Validators.required],
          author: [this.book.author, Validators.required],
          description: [this.book.description, Validators.required],
          image: [this.book.image, Validators.required],
        });
      }
    )
  }

}
