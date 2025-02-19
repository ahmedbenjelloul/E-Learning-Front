import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursComponent } from './admin/cours/cours.component';
import { AddEditCoursComponent } from './admin/cours/add-edit-cours/add-edit-cours.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CoursComponent,
    AddEditCoursComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Doit être AVANT les modules Angular Material
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
  
    // Bootstrap Modal
    NgbModalModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
