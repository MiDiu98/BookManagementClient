import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  bookNew: Book[] = [];
  books: Book[] = [];
  searchForm: FormGroup;
  isSearch = false;

  // For Pagination
  currentPage = 1;
  startPage = 1;
  endPage = 1;
  totalRecords = 0;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('11111');

    this.searchForm = this.formBuilder.group({
      title: [''],
      author: ['']
    });
    this.getBookEnabled();
    this.getBookNew();
  }

  // convinience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  public getBookEnabled() {
    this.bookService.getBookEnable()
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              this.books = data;
            }
          );
  }

  public getBookNew() {
    this.bookService.getBookNew().subscribe(
      data => {
        console.log(data);
        this.bookNew = data;
      }
    )
  }

  public search() {
    this.bookService.searchBookByTitleOrAuthor(this.f.title.value, this.f.author.value).subscribe(
      response => {
          this.books = response;
          this.bookNew = [];
      }
    )
  }

  public getNextPage() {
    // this.bookService.getAll(this.currentPage + 1).subscribe(
    //   response => {
    //     this.users = response.Data;
    //     this.totalRecords = response.TotalRecords;
    //     this.endPage = Math.floor(this.totalRecords / 5) + (this.totalRecords % 5 === 0 ? 0 : 1);
    //     this.currentPage++;
    //   }
    // );
}

public getPrePage() {
  // this.bookService.getAll(this.currentPage - 1).subscribe(
  //   response => {
  //     this.users = response.Data;
  //     this.totalRecords = response.TotalRecords;
  //     this.endPage = Math.floor(this.totalRecords / 5) + (this.totalRecords % 5 === 0 ? 0 : 1);
  //     this.currentPage--;
  //   }
  // );
}

public getStartPage() {
  // this.bookService.getAll(this.startPage).subscribe(
  //   response => {
  //     this.users = response.Data;
  //     this.totalRecords = response.TotalRecords;
  //     this.endPage = Math.floor(this.totalRecords / 5) + (this.totalRecords % 5 === 0 ? 0 : 1);
  //     this.currentPage = this.startPage;
  //   }
  // );
}

public getEndPage() {
  // this.bookService.getAll(this.endPage).subscribe(
  //   response => {
  //     this.users = response.Data;
  //     this.totalRecords = response.TotalRecords;
  //     this.endPage = Math.floor(this.totalRecords / 5) + (this.totalRecords % 5 === 0 ? 0 : 1);
  //     this.currentPage = this.endPage;
  //   }
  // );
}
}
