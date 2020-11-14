import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Book } from 'src/app/shared/models/book.model';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { BookService } from 'src/app/shared/services/book.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId = 0;
  book: Book;
  public Editor = ClassicEditor;
  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }

  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(
      (params: Params) => {
        this.bookId = params.bookId;
      }
    );
    this.getBookById(this.bookId);
  }

  get f() {return this.bookForm.controls; }

  private initForm() {
    this.bookForm = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

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
        this.alertify.success('Update successful!');
        this.router.navigate(['/books/' + response.id]);
      },
      error => {
        this.alertify.error('Update fail, please try again!');
      }
    )
  }

  private getBookById(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(
      (data: Book) => {
        console.log(data);
        this.book = data;
        this.bookForm.setValue({
          title: this.book.name,
          author: this.book.supplier,
          description: this.book.description,
          image: this.book.image
        });
      }
    )
  }

}
