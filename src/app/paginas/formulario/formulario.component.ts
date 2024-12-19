import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteModel } from '../../modelos/cliente.model';
import { AdminCrudClientesService } from '../../servicios/admin-crud-clientes.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [    FormsModule,
    MatDialogModule,
    HttpClientModule,
    CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  clientes: ClienteModel[] = [];
  cliente: ClienteModel = this.nuevoCliente();
  mostrarFormulario = false;
  editando = false;
  showSuccessMessage = false;  // Variable para mostrar el mensaje de éxito

  constructor(private clientesService: AdminCrudClientesService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clientesService.obtenerTodosLosClientes().subscribe(
      (data) => (this.clientes = data),
      (error) => console.error('Error al obtener clientes:', error)
    );
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.cliente = this.nuevoCliente();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarCliente(): void {
    if (!this.cliente.nombre || !this.cliente.correo || !this.cliente.telefono) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const clienteAEnviar = { ...this.cliente };
    if (!this.editando) {
      delete clienteAEnviar.id;
    }

    if (this.editando) {
      const { id, ...clienteSinId } = clienteAEnviar;

      if (id !== undefined) {
        this.clientesService.actualizarCliente(id, clienteSinId).subscribe(
          () => {
            this.obtenerClientes();
            this.cerrarFormulario();
            console.log('Cliente actualizado correctamente');
          },
          (error) => console.error('Error al actualizar el cliente:', error)
        );
      } else {
        console.error('El id del cliente no está definido');
      }
    } else {
      this.clientesService.agregarCliente(clienteAEnviar).subscribe(
        () => {
          this.obtenerClientes();
          this.cerrarFormulario();
          this.showSuccessMessage = true;  // Mostrar el mensaje de éxito
          setTimeout(() => this.showSuccessMessage = false, 3000); // Desaparecer después de 3 segundos
          console.log('Cliente agregado correctamente');
        },
        (error) => console.error('Error al agregar el cliente:', error)
      );
    }
  }

  private nuevoCliente(): ClienteModel {
    return {
      id: 0,
      nombre: '',
      correo: '',
      telefono: '',
      preferencias: '',
    };
  }
}