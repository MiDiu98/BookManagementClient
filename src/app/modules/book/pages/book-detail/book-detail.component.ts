import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { Login } from 'src/app/shared/models/Login';
import { BookService } from 'src/app/shared/services/book.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Comment } from 'src/app/shared/models/comment.model';

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
  isUpdate = false;
  commentCurrent: number;
  isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private alertify: AlertifyService
    ) { }

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
        this.book = data;
      }
    )
  }

  getAllComment(bookId: number) {
    this.commentService.getAllComment(bookId).subscribe(
      (data) => {
        this.comments = data;
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
        this.alertify.warning('You must login to comment!');
        this.isLogin = false;
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
