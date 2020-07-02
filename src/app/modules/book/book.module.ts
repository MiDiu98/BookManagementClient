import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BookDetailComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ]
})
export class BookModule { }
