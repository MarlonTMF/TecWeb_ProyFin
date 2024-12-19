import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '../../modelos/reloj.model'; // Modelo de reloj
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';

@Component({
  selector: 'app-form-editar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-editar-producto.component.html',
  styleUrl: './form-editar-producto.component.scss'
})
export class FormEditarProductoComponent {
  reloj: ProductModel; // Objeto reloj
  relojes: ProductModel[] = []; // Lista de relojes

  constructor(
    public dialogRef: MatDialogRef<FormEditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private relojService: AdminCRUDRelojesService // Servicio para CRUD de relojes
  ) {
    // Inicializa los datos del reloj con los proporcionados al abrir el modal
    this.reloj = { ...data };
    this.relojService.obtenerTodosLosRelojes().subscribe({
      next: (relojes) => (this.relojes = relojes),
      error: (error) => console.error('Error al obtener los relojes:', error),
    });
  }

  ngOnInit() {
    // Suscripción al servicio de selección de colores
  }


  // idRelojExiste(id: number): boolean {
  //   // Verifica si un reloj con el ID especificado ya existe
  //   return this.relojes.some((reloj) => reloj.id_producto === id);
  // }

  // guardar() {
  //   const relojData: Partial<ProductModel> = {
  //     id_producto: this.reloj.id_producto,
  //     nombre: this.reloj.nombre,
  //     caja: this.reloj.caja,
  //     precio: this.reloj.precio,
  //     stock: this.reloj.stock,
  //     movimiento: this.reloj.movimiento,
  //     descripcion: this.reloj.descripcion,
  //     imagen_url: this.reloj.imagen_url,
  //     material_pulsera: this.reloj.material_pulsera,
  //   };

//     if (this.idRelojExiste(this.reloj.id_producto)) {
//       // Actualiza el reloj si ya existe
//       this.relojService
//         .actualizarReloj(this.reloj.id_producto, relojData)
//         .subscribe({
//           next: (updatedReloj) => {
//             console.log('Reloj actualizado:', updatedReloj);
//             this.dialogRef.close(updatedReloj);
//           },
//           error: (error) => {
//             console.error('Error al actualizar el reloj:', error);
//           },
//         });
//     } else {
//       // Agrega un nuevo reloj si no existe
//       this.relojService.agregarReloj(relojData as ProductModel).subscribe({
//         next: (newReloj) => {
//           console.log('Reloj agregado:', newReloj);
//           this.dialogRef.close(newReloj);
//         },
//         error: (error) => {
//           console.error('Error al agregar el reloj:', error);
//         },
//       });
//     }
//   }

//   cancelar() {
//     // Cierra el modal sin guardar cambios
//     this.dialogRef.close();
//   }
 }