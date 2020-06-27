import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    ManageUserComponent,
    ManageBookComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
