import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { Login } from 'src/app/shared/models/Login';
import { BookService } from 'src/app/shared/services/book.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

    this.commentService.postComment(this.bookId, this.f.message.value).subscribe(
      data => {
        this.alertify.success('Bạn vừa thêm bình luận!');
        this.getAllComment(this.bookId);
      },
      error => {
        this.alertify.warning('Đăng nhập để bình luận!');
      }
    )
  }

  editButtonClick(commentId: number) {
    this.commentService.getCommentById(commentId).subscribe(
      data => {
        console.log(data);
        this.f.message.setValue(data.message);
        this.isUpdate = true;
        this.commentCurrent = commentId;
      }
    )
  }

  deleteButtonClick(commentId: number) {
    this.deleteComment(commentId);
  }

  updateComment() {
    this.commentService.updateComment(this.commentCurrent, this.f.message.value).subscribe(
      data => {
        console.log(data);
        this.getAllComment(this.bookId);
        this.f.message.setValue('');
        this.isUpdate = false;
      },
      error => {
        this.alertify.error('Bạn không có quyền chỉnh sửa hoặc chưa đăng nhập!');
        this.f.message.setValue('');
        this.isUpdate = false;
      }
    )
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      data => {
        this.getAllComment(this.bookId);
      },
      error => {
        this.alertify.error('Bạn không có quyền xóa hoặc chưa đăng nhập!');
      }
    );
  }

}
