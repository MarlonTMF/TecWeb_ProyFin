import { Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '../../modelos/reloj.model'; // Cambié 'profesor' por 'producto'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';

@Component({
  selector: 'app-form-crear-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-crear-producto.component.html',
  styleUrl: './form-crear-producto.component.scss'
})
export class FormCrearProductoComponent {
  selectedColor: string = '';
  producto: ProductModel;
  productos: ProductModel[] = []; // Cambié el nombre de 'profesores' a 'productos'

  constructor(
    public dialogRef: MatDialogRef<FormCrearProductoComponent>,  // Cambié el tipo de referencia
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,  // Cambié 'Profesor' por 'ProductModel'
    private productService: AdminCRUDRelojesService  // Cambié el servicio 'ProfesorService' por 'ProductService'
  ) {
    this.producto = { ...data };  // Adaptado para el nuevo modelo
    this.productService.obtenerTodosLosRelojes().subscribe({
      next: (productos) => (this.productos = productos),
      error: (error) => console.error('Error al obtener los productos:', error),
    });
  }

  ngOnInit() {

  }
  
  idProductoExiste(id: number): boolean {  // Cambié 'idProfesor' por 'idProducto'
    return this.productos.some((producto) => producto.id_producto === id);  // Adaptado a 'producto'
  }

  guardar() {
    const productoData: ProductModel = {  
      id_producto: this.producto.id_producto!,
      nombre: this.producto.nombre || '',  // Valor predeterminado si está undefined
      caja: this.producto.caja || '', 
      precio: this.producto.precio || 0,
      stock: this.producto.stock || 0,
      movimiento: this.producto.movimiento || '',
      descripcion: this.producto.descripcion || '',
      imagen_url: this.producto.imagen_url || '',
      material_pulsera: this.producto.material_pulsera || ''
    };

    if (this.idProductoExiste(this.producto.id_producto)) {
      // Si el producto existe, actualiza el producto
      this.productService.actualizarReloj(this.producto.id_producto, productoData).subscribe({
        next: (updatedProducto) => {
          console.log('Producto actualizado:', updatedProducto);
          this.dialogRef.close(updatedProducto);
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
        },
      });
    } else {
      // Si el producto no existe, lo crea
      this.productService.agregarReloj(productoData).subscribe({
        next: (newProducto) => {
          console.log('Producto agregado:', newProducto);
          this.dialogRef.close(newProducto);
        },
        error: (error) => {
          console.error('Error al agregar el producto:', error);
        },
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}