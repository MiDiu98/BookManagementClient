import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookFormComponent } from './components/book-form/book-form.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
     BookFormComponent,
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
     BookFormComponent
  ]
})
export class SharedModule { }
