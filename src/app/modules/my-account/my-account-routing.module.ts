import { MyBookComponent } from './pages/my-books/my-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewBookComponent } from './pages/new-book/new-book.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-account/my-books',
    pathMatch: 'full'
  },
  {path: 'my-books', component: MyBookComponent},
  {path: 'new-book', component: NewBookComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
