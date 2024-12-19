import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
    login(username: string, password: string): Observable<any> {
      // Simulando una respuesta exitosa si el usuario es 'admin' y la contraseña es 'admin'
      if (username === 'admin' && password === 'admin') {
        return of({ token: 'mock-jwt-token' });  // Simulamos un token JWT
      } else {
        return of(null);  // Si el usuario o la contraseña son incorrectos, devolvemos null
      }
    }
  }
/*
export class AuthService {
  private apiUrl = 'http://tuservidor/api/login'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para hacer login y obtener el token
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body);
  }

  // Guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Eliminar el token (cuando el usuario se desloguea)
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Verificar si el token está presente
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
  */
