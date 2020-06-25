import { BasicAuthHttpInterceptorService } from './_services/basic-auth-http-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { UserComponent } from './_components/user/user.component';
import { LoginComponent } from './_components/login/login.component';
import { AboutComponent } from './_components/about/about.component';
import { RegisterComponent } from './_components/register/register.component';
import { BookDetailComponent } from './_components/book-detail/book-detail.component';
import { MyBookComponent } from './_components/my-book/my-book.component';
import { NewBookComponent } from './_components/new-book/new-book.component';
import { UpdateBookComponent } from './_components/update-book/update-book.component';
import { ManageUserComponent } from './_components/manage-user/manage-user.component';
import { ManageBookComponent } from './_components/manage-book/manage-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    AboutComponent,
    RegisterComponent,
    BookDetailComponent,
    MyBookComponent,
    NewBookComponent,
    UpdateBookComponent,
    ManageUserComponent,
    ManageBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
