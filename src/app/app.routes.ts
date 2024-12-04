import { Routes } from '@angular/router';
import { AdminRelojesComponent } from './paginas/admin-relojes/admin-relojes.component';
import { HomeComponent } from './paginas/home/home.component';
import { AdminClientesComponent } from './paginas/admin-clientes/admin-clientes.component';


export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'admin-relojes', component:AdminRelojesComponent},
    {path:'admin-clientes', component:AdminClientesComponent}
];
