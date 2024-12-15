import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de incluir esto
import { routes } from './app.routes'; 
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminCRUDRelojesService } from './servicios/admin-crud-relojes.service';
import { VerProductosComponent } from './paginas/ver-productos/ver-productos.component';


@NgModule({
  declarations: [
    VerProductosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule

  ],

  providers: [],
  bootstrap: [VerProductosComponent]


})
export class AppModule {}
