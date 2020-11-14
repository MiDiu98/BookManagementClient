import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  // public bookForm: FormGroup;
  // public Editor = ClassicEditor;
  // public onReady( editor ) {
  //     editor.ui.getEditableElement().parentElement.insertBefore(
  //         editor.ui.view.toolbar.element,
  //         editor.ui.getEditableElement()
  //     );
  // }

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private alertify: AlertifyService,
  //   private bookService: BookService,
  //   private router: Router
  // ) { }

  ngOnInit(): void {
    // this.bookForm = this.formBuilder.group({
    //   title: [null, Validators.required],
    //   author: [null, Validators.required],
    //   description: [null, Validators.required],
    //   image: [null, Validators.required],
    // });
  }

  // get f() {return this.bookForm.controls; }

  // onSubmit() {

  //   if (this.bookForm.invalid) {
  //     return;
  //   }

  //   console.log(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value);
  //   this.createBook();
  // }

  // private createBook() {
  //   if (this.bookForm.invalid) {
  //     this.alertify.error(`You don't add enough all fields required`);
  //     return;
  //   } else {
  //     console.log(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value);
  //   }

  //   this.bookService.createNewBook(this.f.title.value, this.f.author.value, this.f.description.value, this.f.image.value).subscribe(
  //     response => {
  //       console.log(response);
  //       this.alertify.success('Create book successful!');
  //       this.router.navigate(['/books/' + response.id]);
  //     },
  //     error => {
  //       this.alertify.error('Fail to create the book, please try again!');
  //     }
  //   );
  // }

  // public onSubmitForm(value: any) {
  //   console.log('value', value);
  // }

}
