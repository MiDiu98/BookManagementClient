import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    SharedModule,
    CKEditorModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class MyAccountModule { }
