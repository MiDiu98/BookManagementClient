import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/manage-user',
    pathMatch: 'full'
  },
  {path: 'manage-user', component: ManageUserComponent},
  {path: 'manage-book', component: ManageBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
