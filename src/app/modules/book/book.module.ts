import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
//import * as $ from 'jquery';


@NgModule({
  declarations: [
    BookDetailComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ]
})
export class BookModule { }
