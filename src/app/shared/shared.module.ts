import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AlertifyService } from './services/alertify.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewFormComponent } from './components/review-form/review-form.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  NgbModule
];

@NgModule({
  declarations: [
     BookFormComponent,
     ConfirmComponent,
     ReviewFormComponent
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    BookFormComponent,
    ReviewFormComponent
  ]
})
export class SharedModule { }
