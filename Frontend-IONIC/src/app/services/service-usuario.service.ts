import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {

  baseUrl: string = environment.baseUrl;
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
    return this.http.post(`${this.baseUrl}token/`, body);
  }
  postFeedback(body:any):Observable<any>{
    const token = localStorage.getItem('token');  // Asegúrate de que el token se almacene correctamente
    if (!token) {
      console.error('Token no encontrado');
    }
    return this.http.post(`${this.apiUrl}feedback/create/`, body,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

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
