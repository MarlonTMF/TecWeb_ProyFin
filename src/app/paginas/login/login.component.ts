import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { LoginService } from '../../servicios/login.service';

export interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginData = {
    username: '',
    password: ''
  };

  loginError: boolean = false;


  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      console.error('Los campos son obligatorios');
      return;
    }

    console.log('Formulario enviado:', this.loginData);

    // Llamada al servicio de autenticación para hacer login
    this.loginService.login(this.loginData.username, this.loginData.password).subscribe(
      (response) => {
        // Si el login es exitoso, redirige al home
        console.log('Login exitoso:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Maneja el error si las credenciales no son correctas
        console.error('Error de autenticación', error);
      }
    );
  }
}
  /*
  onSubmit() {
    console.log("Formulario enviado"); 
    if (!this.loginData.username || !this.loginData.password) {
      console.error('Los campos son obligatorios');
      return;
    }

    // Llamada al servicio de autenticación
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(response => {
      if (response && response.token) {
        console.log('Inicio de sesión exitoso');
        // Guardar el token en el localStorage o en el estado de la aplicación si es necesario
        localStorage.setItem('authToken', response.token);
        // Redirigir a la página principal
        this.router.navigate(['/home']);
        this.loginError = false;
      } else {
        console.error('Credenciales incorrectas');
        this.loginError = true;
      }
    });
  }
}

*/
  /*
  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      console.error('Los campos son obligatorios');
      return;
    }

    // Llamar al servicio de login
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        // Si la autenticación es exitosa, guarda el token
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/home']);  // Redirige a la página home
        } else {
          console.error('Token no recibido');
        }
      },
      error => {
        console.error('Error de autenticación', error);
      }
    );
  }
}
  */

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule // Necesario si usas rutas dentro del módulo
  ],
  exports: [LoginComponent], // Exportar el componente para ser utilizado en otros módulos
})
export class LoginModule {}
