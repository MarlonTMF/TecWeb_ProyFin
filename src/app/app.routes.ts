import { Routes } from '@angular/router';
import { AdminRelojesComponent } from './paginas/admin-relojes/admin-relojes.component';
import { HomeComponent } from './paginas/home/home.component';
import { VerProductosComponent } from './paginas/ver-productos/ver-productos.component'; 
import { FormularioComponent } from './paginas/formulario/formulario.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'admin-relojes', component:AdminRelojesComponent},
    {path:'ver-productos', component:VerProductosComponent},
    {path:'home', component:HomeComponent},
    {path: 'formulario', component: FormularioComponent },

];
