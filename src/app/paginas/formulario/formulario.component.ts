import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  // Datos del usuario
  user = {
    nombre: '',
    email: '',
    password: '',
  };

  // Variable para mostrar mensaje de éxito
  showSuccessMessage = false;

  // Método para manejar el envío del formulario
  onSubmit() {
    this.showSuccessMessage = true;
    console.log('Usuario registrado:', this.user);
  }

  // Método para redirigir a la página principal
  goToHome() {
    // Aquí puedes redirigir usando un router (ejemplo con Router.navigate(['/home']))
    console.log('Navegando a la página principal');
  }
}
