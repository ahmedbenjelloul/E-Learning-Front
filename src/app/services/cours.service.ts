import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cours } from '../models/cours';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}
  ajouterUnCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}/courses/create`, cours);
  }

  supprimerUnCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  updateUnCours(offre: Cours, id: number): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/courses/${id}`, offre);
  }

  getUnCoursById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/courses/${id}`);
  }

  getUnCoursByUserId(id: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/courses/user/${id}`);
  }

  tousLesCours(page: number = 0, size: number = 4): Observable<Cours[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Cours[]>(`${this.apiUrl}/courses/pagination/All`, { params });
  }
  findAll(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/courses/all`);
  }
  getFormateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/formateurs`);
  }
  
}
