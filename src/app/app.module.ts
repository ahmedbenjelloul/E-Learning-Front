import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Nécessaire pour mat-option
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
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { QuizComponent } from './quiz/quiz.component';

=======
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
>>>>>>> b02c4377ba71e9982d07acce5a4e53d301946c59
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CoursComponent,
    AddEditCoursComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    QuizComponent,

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
    MatIconModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatSelectModule,MatTableModule,
    MatOptionModule, // Ajoutez ceci
    MatCheckboxModule,MatCardModule,
    // Bootstrap Modal
    NgbModalModule,JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['*'], // Replace with your domain
        disallowedRoutes: [] // Replace with your API URL
      }
    }),
  ],
  
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
