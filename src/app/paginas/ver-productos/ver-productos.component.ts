import { Component } from '@angular/core';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';
import { ProductModel } from '../../modelos/reloj.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss'
})
export class VerProductosComponent {
  productos: ProductModel[] = [];
  nombre: string = '';
  caja: string = '';
  precio: string = '';

  constructor(private relojService: AdminCRUDRelojesService) {}

  ngOnInit(): void {
    this.obtenerTodosLosProductos(); 
  }

  obtenerTodosLosProductos(): void {
    this.relojService.obtenerTodosLosRelojes().subscribe(
      (data) => this.productos = data,
      (error) => console.error('Error al obtener los productos:', error)
    );
  }

  buscarProductos(): void {
    this.relojService.buscarReloj(this.nombre, this.caja).subscribe(
      (data) => this.productos = data,
      (error) => console.error('Error al buscar productos:', error)
    );
  }
}