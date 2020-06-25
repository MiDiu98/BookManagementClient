import { ManageUserComponent } from './_components/manage-user/manage-user.component';
import { ManageBookComponent } from './_components/manage-book/manage-book.component';
import { UpdateBookComponent } from './_components/update-book/update-book.component';
import { NewBookComponent } from './_components/new-book/new-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { UserComponent } from './_components/user/user.component';
import { AboutComponent } from './_components/about/about.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { BookDetailComponent } from './_components/book-detail/book-detail.component';
import { MyBookComponent } from './_components/my-book/my-book.component';

const routes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'users',      component: UserComponent },
  { path: 'about',   component: AboutComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'books/:bookId',     component: BookDetailComponent },
  { path: 'mybook',     component: MyBookComponent },
  { path: 'new',     component: NewBookComponent },
  { path: 'update/:bookId',     component: UpdateBookComponent },
  { path: 'manage-user',     component: ManageUserComponent },
  { path: 'manage-book',     component: ManageBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
