import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,of,throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { ProductModel } from '../modelos/reloj.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Injectable({
  providedIn: 'root'
})
export class AdminCRUDRelojesService {

  private apiURL = "http://localhost:3000/api/v1/producto";

  constructor(private http:HttpClient) {}

    obtenerTodosLosRelojes(): Observable<ProductModel[]>{
      return this.http.get<ProductModel[]>(this.apiURL).pipe(
        catchError(this.handleError)
      );
    }

    obtenerRelojPorId(id: number): Observable<ProductModel> {
      return this.http.get<ProductModel>(`${this.apiURL}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    agregarReloj(producto: ProductModel): Observable<ProductModel> {
      return this.http.post<ProductModel>(`${this.apiURL}`, producto).pipe(
        catchError((error) => {
          console.error('Error al agregar el producto:', error);
          return this.handleError(error); // Mejora en la depuración.
        })
      );
    }
    
    actualizarReloj(id: number, producto: ProductModel): Observable<any> {
      // Eliminar los campos id y deletedAt antes de enviar
      const productoSinIdYDeletedAt = { ...producto };
      delete productoSinIdYDeletedAt.id;  // Asegúrate de que el id no esté incluido
    
      const url = `http://localhost:3000/api/v1/producto/${id}`;
      return this.http.patch(url, productoSinIdYDeletedAt).pipe(
        catchError(this.handleError)
      );
    }
    
    
    
    obtenerRelojesPorCategoria(categoria: string): Observable<ProductModel[]> {
      return this.http.get<ProductModel[]>(`${this.apiURL}?categoria=${categoria}`).pipe(
        catchError(this.handleError)
      );
    }

    buscarReloj(nombre: string, caja: string): Observable<ProductModel[]> {
      return this.http.get<ProductModel[]>(
        `${this.apiURL}?nombre=${nombre}&caja=${caja}`
      ).pipe(
        catchError(this.handleError)
      );
    }
  
    eliminarReloj(id: number): Observable<void> {
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
