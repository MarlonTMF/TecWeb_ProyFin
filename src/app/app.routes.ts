import { Routes } from '@angular/router';
import { AdminRelojesComponent } from './paginas/admin-relojes/admin-relojes.component';
import { HomeComponent } from './paginas/home/home.component';
import { AdminClientesComponent } from './paginas/admin-clientes/admin-clientes.component';
import { VerProductosComponent } from './paginas/ver-productos/ver-productos.component';
import { CategoriaSeamasterComponent } from './paginas/categoria-seamaster/categoria-seamaster.component';
import { CategoriaSpeedmasterComponent } from './paginas/categoria-speedmaster/categoria-speedmaster.component';
import { FormularioComponent } from './paginas/formulario/formulario.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'admin-relojes', component:AdminRelojesComponent},
    {path:'admin-clientes', component:AdminClientesComponent},
    {path:'ver-prouctos', component:VerProductosComponent},
    {path:'categoria-seamaster', component:CategoriaSeamasterComponent},
    {path:'categoria-speedmaster', component:CategoriaSpeedmasterComponent},
    {path:'formulario', component:FormularioComponent}

];
