import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteModel } from '../../modelos/cliente.model';
import { AdminCrudClientesService } from '../../servicios/admin-crud-clientes.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent implements OnInit {
  clientes: ClienteModel[] = [];
  cliente: ClienteModel = this.nuevoCliente();
  mostrarFormulario = false;
  editando = false;
  filtroNombre: string = '';
  filtroCorreo: string = '';

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
  
    // Eliminar id si no estamos editando (agregando nuevo cliente)
    const clienteAEnviar = { ...this.cliente };
    if (!this.editando) {
      delete clienteAEnviar.id; // No enviar id cuando es un nuevo cliente
    }
  
    if (this.editando) {
      // Eliminar el campo `id` si se está editando
      const { id, ...clienteSinId } = clienteAEnviar;
  
      // Verificar si `id` es válido (no es undefined) antes de llamar a actualizarCliente
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
      // Si no está editando, agregar un nuevo cliente
      this.clientesService.agregarCliente(clienteAEnviar).subscribe(
        () => {
          this.obtenerClientes();
          this.cerrarFormulario();
          console.log('Cliente agregado correctamente');
        },
        (error) => console.error('Error al agregar el cliente:', error)
      );
    }
  }
  
  


  editarCliente(id: number): void {
    if (!id) {
      console.error('El ID del cliente no es válido');
      return;
    }
    this.clientesService.obtenerClientePorId(id).subscribe(
      (data) => {
        this.cliente = data;
        this.mostrarFormulario = true;
        this.editando = true;
      },
      (error) => console.error('Error al obtener el cliente:', error)
    );
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clientesService.eliminarCliente(id).subscribe(
        () => {
          this.obtenerClientes();
          console.log('Cliente eliminado correctamente');
        },
        (error) =>
          console.error('Error al eliminar el cliente:', error)
      );
    }
  }

  get clientesFiltrados(): ClienteModel[] {
    return this.clientes.filter(
      (cliente) =>
        (!this.filtroNombre ||
          cliente.nombre?.toLowerCase()
            .includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroCorreo ||
          cliente.correo?.toLowerCase().includes(this.filtroCorreo.toLowerCase()))
    );
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
