import { Component } from '@angular/core';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';
import { ProductModel } from '../../modelos/reloj.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss',
})
export class VerProductosComponent {
  productos: ProductModel[] = [];
  productosFiltrados: ProductModel[] = [];
  nombre: string = '';
  caja: string = '';
  precio: string = '';
  materialPulsera: string = ''; // Nueva variable para el filtro de material

  constructor(private relojService: AdminCRUDRelojesService) {}

  ngOnInit(): void {
    this.obtenerTodosLosProductos();
  }

  obtenerTodosLosProductos(): void {
    this.relojService.obtenerTodosLosRelojes().subscribe(
      (data) => {
        this.productos = data;
        this.productosFiltrados = data; // Inicializar con todos los productos
      },
      (error) => console.error('Error al obtener los productos:', error)
    );
  }

  toggleDescripcion(producto: ProductModel): void {
    // Cambiar el estado de mostrarDescripcion
    producto.mostrarDescripcion = !producto.mostrarDescripcion;
  }

  buscarProductos(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideNombre = this.nombre
        ? producto.nombre?.toLowerCase().includes(this.nombre.toLowerCase())
        : true;

      const coincideCaja = this.caja
        ? producto.caja?.toLowerCase().includes(this.caja.toLowerCase())
        : true;

      // const coincidePrecio = this.precio
      //   ? producto.precio >= parseFloat(this.precio)
      //   : true;

      const coincideMaterialPulsera = this.materialPulsera
        ? producto.material_pulsera === this.materialPulsera
        : true;

      return coincideNombre && coincideCaja && coincideMaterialPulsera;
    });
  }
}import { Component } from '@angular/core';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';
import { ProductModel } from '../../modelos/reloj.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.scss',
})
export class VerProductosComponent {
  productos: ProductModel[] = [];
  productosFiltrados: ProductModel[] = [];
  nombre: string = '';
  caja: string = '';
  precio: string = '';
  materialPulsera: string = ''; // Nueva variable para el filtro de material

  constructor(private relojService: AdminCRUDRelojesService) {}

  ngOnInit(): void {
    this.obtenerTodosLosProductos();
  }

  obtenerTodosLosProductos(): void {
    this.relojService.obtenerTodosLosRelojes().subscribe(
      (data) => {
        this.productos = data;
        this.productosFiltrados = data; // Inicializar con todos los productos
      },
      (error) => console.error('Error al obtener los productos:', error)
    );
  }

  buscarProductos(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideNombre = this.nombre
        ? producto.nombre.toLowerCase().includes(this.nombre.toLowerCase())
        : true;

      const coincideCaja = this.caja
        ? producto.caja.toLowerCase().includes(this.caja.toLowerCase())
        : true;

      const coincidePrecio = this.precio
        ? producto.precio >= parseFloat(this.precio)
        : true;

      const coincideMaterialPulsera = this.materialPulsera
        ? producto.material_pulsera === this.materialPulsera
        : true;

      return coincideNombre && coincideCaja && coincidePrecio && coincideMaterialPulsera;
    });
  }
}
