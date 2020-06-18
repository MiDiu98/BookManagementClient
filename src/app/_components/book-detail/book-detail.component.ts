import { AlertifyService } from './../../_services/alertify.service';
import { Login } from './../../_models/Login';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from './../../_models/comment.model';
import { CommentService } from './../../_services/comment.service';
import { BookService } from './../../_services/book.service';
import { Book } from './../../_models/Book';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId = 0;
  book: Book;
  comments: Comment[] = [];
  commentForm: FormGroup;
  currentUser: Login;
  isLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private alertify: AlertifyService
    ) {
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        this.isLogin = true;
      }
    );
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.bookId = params.bookId;
      }
    );
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

    this.getBookById(this.bookId);
    this.getAllComment(this.bookId);
  }

  getBookById(bookId: number) {
    this.bookService.getBookById(bookId).subscribe(
      (data: Book) => {
        console.log(data);
        this.book = data;
      }
    )
  }

  getAllComment(bookId: number) {
    this.commentService.getAllComment(bookId).subscribe(
      (data) => {
        console.log(data);
        this.comments = data;
      }
    )
  }

  get f() { return this.commentForm.controls; }

  postComment() {
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      console.log('Invalid!');
      return;
    }

    if (this.isLogin === false) {
      console.log('Login!');
      this.alertify.message('Đăng nhập để bình luận');
    }

    this.commentService.postComment(this.bookId, this.f.message.value).subscribe(
      (data) => {
        console.log(data);
        this.getAllComment(this.bookId);
      }
    )
  }

}
