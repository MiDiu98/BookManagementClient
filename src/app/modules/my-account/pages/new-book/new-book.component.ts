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
    this.bookForm = this.formBuilder.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
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
        this.alertify.success('Create book successful!');
        this.router.navigate(['/books/' + response.id]);
      },
      error => {
        this.alertify.error('Fail to create the book, please try again!');
      }
    );
  }

  public onSubmitForm(value: any) {
    console.log('value', value);
  }

}
