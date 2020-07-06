import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    ManageUserComponent,
    ManageBookComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports:  [
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class AdminModule { }
