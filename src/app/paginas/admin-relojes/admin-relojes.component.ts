import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from  '../../modelos/reloj.model'
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule

@Component({
  selector: 'app-admin-relojes',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  templateUrl: './admin-relojes.component.html',
  styleUrl: './admin-relojes.component.scss'
})
export class AdminRelojesComponent implements OnInit {
  productos: ProductModel[] = [];
  producto: ProductModel = this.nuevoProducto();
  mostrarFormulario = false;
  editando = false;
  filtroNombre: string = '';
  filtroCaja: string = '';

  constructor(private relojesService: AdminCRUDRelojesService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.relojesService.obtenerTodosLosRelojes().subscribe(
      (data) => (this.productos = data),
      (error) => console.error('Error al obtener relojes:', error)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.producto = this.nuevoProducto();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarProducto(): void {
    // Validaciones de campos
    if (
      !this.producto.nombre ||
      !this.producto.caja ||
      this.producto.precio == null ||
      this.producto.stock == null
    ) {
      console.error('Todos los campos son obligatorios');
      return;
    }
  
    // Validación extra para asegurarse de que el producto tenga el formato esperado
    if (typeof this.producto.nombre !== 'string' || this.producto.nombre.trim() === '') {
      console.error('El nombre del producto es inválido');
      return;
    }
  
    if (this.producto.precio <= 0) {
      console.error('El precio debe ser mayor que cero');
      return;
    }
  
    if (this.producto.stock < 0) {
      console.error('El stock no puede ser negativo');
      return;
    }
  
    console.log('Datos a enviar al backend:', this.producto); // Imprimir los datos que se enviarán
  
    // Enviar solicitud al servidor
    if (this.editando) {
      // Actualizar producto
      if (!this.producto.id) {
        console.error('El ID del producto no es válido');
        return;
      }
      this.relojesService.actualizarReloj(this.producto.id, this.producto).subscribe(
        () => {
          this.obtenerProductos();
          this.cerrarFormulario();
          console.log('Producto actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      // Agregar nuevo producto
      this.relojesService.agregarReloj(this.producto).subscribe(
        (nuevoProducto) => {
          this.obtenerProductos();
          this.cerrarFormulario();
          console.log('Producto agregado correctamente', nuevoProducto);
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
        }
      );
    }
  }
  
  
  editarProducto(id: number | undefined): void {
    if (!id) {
      console.error('El ID del producto no es válido',id);
      return;
    }
    this.relojesService.obtenerRelojPorId(id).subscribe(
      (data) => {
        this.producto = data;
        this.mostrarFormulario = true;
        this.editando = true;
      },
      (error) => console.error('Error al obtener el producto:', error)
    );
  }

  eliminarProducto(id: number | undefined): void {
    if (id === undefined) {
      console.error('El ID del producto no es válido');
      return;
    }
  
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.relojesService.eliminarReloj(id).subscribe(
        () => {
          this.obtenerProductos(); // Recargar productos después de eliminar
          console.log('Producto eliminado correctamente');
        },
        (error) => console.error('Error al eliminar el producto:', error)
      );
    }
  }
  
  

  get productosFiltrados(): ProductModel[] {
    return this.productos.filter(
      (producto) =>
        (!this.filtroNombre ||
          producto.nombre?.toLowerCase()
            .includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroCaja ||
          producto.caja?.toLowerCase().includes(this.filtroCaja.toLowerCase()))
    );
  }

  private nuevoProducto(): ProductModel {
    return {
      id: undefined,
      nombre: '',
      caja: '',
      precio: 0,
      stock: 0,
      movimiento: '',
      descripcion: '',
      imagen_url: '',
      material_pulsera: '',
      categoria:''
    };
  }
}