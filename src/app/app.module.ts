import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicAuthHttpInterceptorService } from './shared/services/basic-auth-http-interceptor.service';
import { DialogBodyComponent } from './_components/dialog-body/dialog-body.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogBodyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [DialogBodyComponent]
})
export class AppModule { }
