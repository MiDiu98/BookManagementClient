import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },
  // {
  //   path: 'admin',
  //  // canActivate: [AuthenticationService],
  //   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
