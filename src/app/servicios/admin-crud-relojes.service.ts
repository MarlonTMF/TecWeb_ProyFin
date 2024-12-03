import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private apiURL = "https://674ca03a54e1fca9290d1f71.mockapi.io/reloj";

  constructor(private http:HttpClient) {}

    obtenerTodosLosRelojes(): Observable<ProductModel[]>{
      return this.http.get<ProductModel[]>(this.apiURL).pipe(
        catchError(this.handleError)
      );
    }

    obtenerRelojPorId(id: string): Observable<ProductModel> {
      return this.http.get<ProductModel>(`${this.apiURL}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    actualizarReloj(id: string, reloj: Partial<ProductModel>): Observable<ProductModel> {
      return this.http.put<ProductModel>(`${this.apiURL}/${id}`, reloj).pipe(
        catchError(this.handleError)
      );
    }

    agregarReloj(reloj: ProductModel): Observable<ProductModel> {
      return this.http.post<ProductModel>(this.apiURL, reloj).pipe(
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
  

    private handleError(error: HttpErrorResponse) {
      console.error('Ocurrió un error:', error);
      return throwError('Algo salió mal; por favor intente de nuevo más tarde.');
    }

}
