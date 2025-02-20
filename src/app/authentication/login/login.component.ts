import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from 'src/app/models/login-request';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  DataResponse: any;
  email: any;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  loginRequest: LoginRequest = { email: '', password: '' };
  login() {
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        this.DataResponse = response;
  
        if (this.DataResponse['access_token'] != null) {
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;
  
          // Stocker les tokens dans le localStorage
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
  
          // Vérifier si le token est bien stocké
          console.log('Access Token:', accessToken);
  
          // Décoder le token pour extraire les informations utilisateur
          const decodedToken = this.authService.decodeToken(accessToken);
  
          // Stocker les informations utilisateur décodées dans le localStorage
          localStorage.setItem('user_info', JSON.stringify(decodedToken));
  
          const user_info = localStorage.getItem('user_info');
          if (user_info !== null) {
            const userInfoObject = JSON.parse(user_info);
            this.email = userInfoObject.sub;
  
            // Vérification de l'email
            console.log('Email:', this.email);
  
            // Récupérer les informations de l'utilisateur par email
            this.authService.getUserByEmail(this.email).subscribe(
              (user: User) => {
                localStorage.setItem('user', JSON.stringify(user));
  
                // Vérifier le rôle de l'utilisateur
                console.log('User Role:', user.role);
  
                if (user.role === 'ADMIN') {
                  this.router.navigate(['/admin/dashboard']);
                } else if (user.role === 'APPRENANT') {
                  this.router.navigate(['/home']);
                } else if (user.role === 'FORMATEUR') {
                  this.router.navigate(['/home']);
                } else {
                  this.router.navigate(['/home']);
                }
              },
              (error) => {
                console.error('Error getting user by email:', error);
              }
            );
          }
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

}
