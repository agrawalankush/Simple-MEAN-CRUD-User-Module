import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { DialogCreateUserComponent } from './dialog-create-user/dialog-create-user.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';
import { HotToastModule } from '@ngneat/hot-toast';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FileUploadComponent,
    ProgressComponent,
    DialogCreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
