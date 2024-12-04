import { Component, OnInit } from '@angular/core';
import { AdminCRUDRelojesService } from '../../servicios/admin-crud-relojes.service';// Asegúrate de importar el servicio
import { ProductModel } from '../../modelos/reloj.model'; 
import { CommonModule } from '@angular/common';  // Importa CommonModule


@Component({
  selector: 'app-categoria-speedmaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-speedmaster.component.html',
  styleUrl: './categoria-speedmaster.component.scss'
})
export class CategoriaSpeedmasterComponent {
  productos: ProductModel[] = [];

  constructor(private adminCRUDRelojesService: AdminCRUDRelojesService) {}

  ngOnInit(): void {
    this.obtenerRelojesPorCategoria('SPEEDMASTER'); // Cambié 'SEAMASTER' por 'SPEEDMASTER'
  }

  // Método para obtener los relojes por categoría
  obtenerRelojesPorCategoria(categoria: string): void {
    this.adminCRUDRelojesService.obtenerRelojesPorCategoria(categoria).subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener relojes:', error);
      }
    );
  }
}