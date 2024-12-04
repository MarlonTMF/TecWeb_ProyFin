import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteModel } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class AdminCrudClientesService {
  private apiURL = 'https://674ca03a54e1fca9290d1f71.mockapi.io/Cliente'; // Cambiar al endpoint para clientes

  constructor(private http: HttpClient) {}

  obtenerTodosLosClientes(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  obtenerClientePorId(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  agregarCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.apiURL, cliente).pipe(
      catchError(this.handleError)
    );
  }

  actualizarCliente(
    id: number,
    cliente: Partial<ClienteModel>
  ): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.apiURL}/${id}`, cliente).pipe(
      catchError(this.handleError)
    );
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError('Algo salió mal; por favor intente de nuevo más tarde.');
  }
}
