import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-cliente',
  imports: [],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.scss'
})
export class FormularioClienteComponent {
  showForm = false;  // Controla la visibilidad del formulario

  toggleForm() {
    this.showForm = !this.showForm;  // Cambia la visibilidad al hacer clic en el botón
  }
}
