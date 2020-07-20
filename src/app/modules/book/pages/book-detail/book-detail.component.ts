import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { Login } from 'src/app/shared/models/Login';
import { BookService } from 'src/app/shared/services/book.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  // for example MatDialog
  animal: string;
  name: string;

  bookId = 0;
  book: Book;
  comments: Comment[] = [];
  commentForm: FormGroup;
  currentUser: Login;
  isUpdate = false;
  commentCurrent: number;
  isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService
    ) {
      this.route.params.subscribe(
        (params: Params) => {
          this.bookId = params.bookId;
        }
      );
     }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

    this.getBookById(this.bookId);
    this.getAllComment(this.bookId);
  }

  /*      Login modal      */
  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.authenticationService.login(result.email, result.password)
          .subscribe(
              data => {
                this.alertify.success('Login successful!');
              },
              error => {
                this.alertify.error('Email or Password is incorrect!');
              });
    });
  }

  getBookById(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(
      (data: Book) => {
        console.log(data);
        this.book = data;
        console.log(this.book);
      }
    );
  }

  getAllComment(bookId: number) {
    this.commentService.getAllComment(bookId).subscribe(
      (data) => {
        console.log(data);
        this.comments = data;
        console.log(this.comments);
      }
    )
  }

  get f() { return this.commentForm.controls; }

  postComment() {
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      this.alertContentInvalid();
      return;
    }

    this.commentService.postComment(this.bookId, this.f.message.value).subscribe(
      data => {
        this.alertify.success('You just add a comment!');
        this.getAllComment(this.bookId);
        this.f.message.setValue('');
      },
      error => {
        this.alertify.warning(`Length is over 255 characters or You aren't login!`);
        this.isLogin = false;
        this.openLoginModal();
      }
    );
  }

  editButtonClick(commentId: number) {
    this.commentService.getCommentById(commentId).subscribe(
      data => {
        this.f.message.setValue(data.message);
        this.isUpdate = true;
        this.commentCurrent = commentId;
      }
    );
  }

  deleteButtonClick(commentId: number) {
    this.alertify.confirm('Delete this comment, are you sure?', () => {
      this.deleteComment(commentId);
    });
  }

  updateComment() {
    if (this.commentForm.invalid) {
      this.alertContentInvalid();
      return;
    }

    this.commentService.updateComment(this.commentCurrent, this.f.message.value).subscribe(
      data => {
        this.getAllComment(this.bookId);
        this.f.message.setValue('');
        this.isUpdate = false;
      },
      error => {
        this.alertify.error('You do not have edit access or have not login yet!');
        this.isUpdate = false;
        this.isLogin = false;
      }
    );
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      data => {
        this.getAllComment(this.bookId);
      },
      error => {
        this.alertify.error('You do not have delete access or have not login yet!');
        this.isLogin = false;
      }
    );
  }

  private alertContentInvalid() {
    this.alertify.error('You have not written comment!');
  }

}
