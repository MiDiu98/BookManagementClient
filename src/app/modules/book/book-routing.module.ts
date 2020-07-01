import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'books/:bookId',
    pathMatch: 'full'
  },
  {path: ':bookId', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
