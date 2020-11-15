import { ProductService } from './../../../../shared/services/product.service';
import { Constant } from './../../../../shared/constants/Constant';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { OrderEnum } from 'src/app/shared/enums/sort.enum';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {

  // enabledBooks: Book[] = [];
  // disabledBooks: Book[] = [];
  // showEnabledBook = false;
  // showDisabledBook = true;
  // sortBy = 'id';
  // sortOrder = true;

  // Pagination disabled book
  currentDisabledBookPage = 0;
  public startDisabledPage = 0;
  public endDisabledPage: number;

  // Pagination enabld book
  currentEnabledBookPage = 0;
  public startEnabledPage = 0;
  public endEnabledPage: number;

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService
  ) {

  }

  ngOnInit(): void {
    // this.getEnabledBook(0, 'id');
    // this.getDisabledBook(0, 'id');
  }

//   getDisabledBook(pageNo: number = 0, sortBy: string) {
//     this.sortBy = sortBy;
//     this.bookService.getBookByAdmin(false, pageNo, 4, sortBy, this.sortOrder ? OrderEnum.ASC : OrderEnum.DESC).subscribe(response => {
//       this.disabledBooks = response.booksDto;
//       this.currentDisabledBookPage = response.currentPage;
//       this.endDisabledPage = response.totalPages - 1;
//     });
//   }

//   getEnabledBook(pageNo: number = 0, sortBy: string) {
//     this.sortBy = sortBy;
//     this.bookService.getBookByAdmin(true, pageNo, 4, sortBy, this.sortOrder ? OrderEnum.ASC : OrderEnum.DESC).subscribe(response => {
//       this.enabledBooks = response.booksDto;
//       this.currentEnabledBookPage = response.currentPage;
//       this.endEnabledPage = response.totalPages - 1;
//     });
//   }

//   onDisabled(bookId: number, book: Book, event) {
//       const checked = event.target.checked;
//       if (!checked) {
//         book.enabled = false;
//         this.bookService.updateBookByAdmin(bookId, book).subscribe(
//           data => {
//             this.alertifyService.success('Update status successful');
//             this.getEnabledBook(this.currentEnabledBookPage, this.sortBy);
//             this.getDisabledBook(this.currentDisabledBookPage, this.sortBy);
//           },
//           error => {
//             this.alertifyService.error('Update status fail');
//           }
//         )
//       }
//     }

//     onEnabled(bookId: number, book: Book, event) {
//       const checked = event.target.checked;
//       if (checked) {
//         book.enabled = true;
//         this.bookService.updateBookByAdmin(bookId, book).subscribe(
//           data => {
//             this.alertifyService.success('Update status successful');
//             this.getEnabledBook(this.currentEnabledBookPage, this.sortBy);
//             this.getDisabledBook(this.currentDisabledBookPage, this.sortBy);
//           },
//           error => {
//             this.alertifyService.error('Update status fail');
//           }
//         )
//       }
//     }

//     public deleteBook(bookId: number) {
//       this.alertifyService.confirm('Delete this book, are you sure?', () => {
//         this.bookService.deleteBookByAdmin(bookId).subscribe(
//           response => {
//             this.alertifyService.success('Deleted');
//             this.getDisabledBook(this.currentDisabledBookPage, this.sortBy);
//           },
//           error => {
//             this.alertifyService.error('Delete fail');
//           }
//         )
//       });
//     }

//   // Pagination for enabled books

//   public getNextEnabledPage() {
//       this.getEnabledBook(this.currentEnabledBookPage + 1, this.sortBy);
//   }

//   public getPrevEnabledPage() {
//     this.getEnabledBook(this.currentEnabledBookPage - 1, this.sortBy);
//   }

//   public getStartEnabledPage() {
//     this.getEnabledBook(this.startEnabledPage, this.sortBy);
//   }

//   public getEndEnabledPage() {
//     this.getEnabledBook(this.endEnabledPage, this.sortBy);
//   }

//   // Pagination for disabled books

//   public getNextDisabledPage() {
//     this.getDisabledBook(this.currentDisabledBookPage + 1, this.sortBy);
// }

// public getPrevDisabledPage() {
//   this.getDisabledBook(this.currentDisabledBookPage - 1, this.sortBy);
// }

// public getStartDisabledPage() {
//   this.getDisabledBook(this.startDisabledPage, this.sortBy);
// }

// public getEndDisabledPage() {
//   this.getDisabledBook(this.endDisabledPage, this.sortBy);
// }
}
