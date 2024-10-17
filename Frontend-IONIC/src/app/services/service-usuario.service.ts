import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {
  // private apiUrl = 'https://fabianpalma000.pythonanywhere.com/api/v-1/'; // Cambia esta URL según tu backend
  private baseUrl = 'http://localhost:8000/api/'
  private apiUrl = this.baseUrl+'v-1/'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }
  // Método para loguear el usuario:
  loginUser(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, body);
  }
  getUser(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}getuser/${id}`);
  }
  getToken(body: any):Observable<any>{
    console.log("BODY:"+body )
    return this.http.post(`${this.baseUrl}token/`, body);
  }

  // Actualizar perfil de usuario
  // Actualizar perfil de usuario
updateUser(userData: any): Observable<any> {
  const token = localStorage.getItem('token');  // Asegúrate de que el token se almacene correctamente
  if (!token) {
    console.error('Token no encontrado');
  }
  return this.http.put(`${this.apiUrl}edit-profile/`, userData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

}
