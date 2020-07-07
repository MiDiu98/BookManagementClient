import { MyBookComponent } from './pages/my-books/my-book.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    MyBookComponent,
    NewBookComponent,
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    SharedModule,
    CKEditorModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class MyAccountModule { }
