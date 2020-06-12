import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { UserComponent } from './_components/user/user.component';
import { AboutComponent } from './_components/about/about.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';


const routes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'users',      component: UserComponent },
  { path: 'about',   component: AboutComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',     component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
