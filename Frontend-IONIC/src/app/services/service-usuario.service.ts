import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {
  private apiUrl = 'http://localhost:8000/api/v-1/'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }
  // Método para loguear el usuario:
  loginUser(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, body);
  }
}
