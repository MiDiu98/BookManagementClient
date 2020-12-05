import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {}
