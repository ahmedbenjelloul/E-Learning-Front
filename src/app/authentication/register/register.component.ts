import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterRequest } from 'src/app/models/register-request';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    login:'',
    role: Role.ROLE_ADMIN,
   
    profileImage: '' // Ce champ n'est plus nécessaire ici, on utilise FormData
  };
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register() {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify({
      prenom: this.registerRequest.prenom,
      nom: this.registerRequest.nom,
      email: this.registerRequest.email,
      password: this.registerRequest.password,

      role: this.registerRequest.role
    })], { type: 'application/json' }));
    
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.authService.register(formData).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        // Redirection ou action après une inscription réussie
        this.router.navigate(['/login']); // Exemple de redirection vers la page de connexion
      },
      (error: any) => {
        console.error('Registration failed', error);
      }
    );
  }

}
