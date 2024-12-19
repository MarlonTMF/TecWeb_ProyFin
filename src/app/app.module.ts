import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { routes } from './app.routes'; 
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AdminCRUDRelojesService } from './servicios/admin-crud-relojes.service';
import { VerProductosComponent } from './paginas/ver-productos/ver-productos.component';
import { LoginComponent} from './paginas/login/login.component';
import { LoginModule } from './paginas/login/login.component'; 
import { AppComponent } from './app.component';
import { AuthService } from './servicios/auth.service'; 
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    VerProductosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    LoginModule
    

  ],

  providers: [AuthService],
  bootstrap: [AppComponent]


})
export class AppModule {}
