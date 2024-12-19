import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteModel } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class AdminCrudClientesService {
  private apiURL = "https://proy-fin-angular-backend.onrender.com/api/v1/cliente";

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
    return this.http.patch<ClienteModel>(`${this.apiURL}/${id}`, cliente).pipe(
      catchError(this.handleError)
    );
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Algo salió mal; por favor intente de nuevo más tarde.';
    
    if (error.error instanceof ErrorEvent) {
      // Error de cliente
      console.error('Error en la solicitud:', error.error.message);
      errorMessage = `Error en la solicitud: ${error.error.message}`;
    } else {
      // Error del servidor
      console.error(`Código de estado: ${error.status}`);
      console.error(`Cuerpo del error: ${JSON.stringify(error.error)}`);
      
      if (error.status === 400) {
        errorMessage = `Error en la solicitud (400): ${error.error.message || 'Solicitud incorrecta'}`;
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado (404)';
      } else if (error.status === 500) {
        errorMessage = 'Error en el servidor (500)';
      }
    }
  
    // Puedes realizar una acción adicional, como mostrar un mensaje en la UI o enviar el error a un servicio de monitoreo.
    return throwError(errorMessage);
  }

}
