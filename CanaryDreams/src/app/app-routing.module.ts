import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlojamientoComponent } from './alojamiento/alojamiento.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { InformacionPersonalComponent } from './cuenta/informacion-personal/informacion-personal.component';
import { MisReservasComponent } from './cuenta/mis-reservas/mis-reservas.component';
import { HomeComponent } from './home/home.component';
import { IslaComponent } from './isla/isla.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'buscador', component: BuscadorComponent, pathMatch: 'full' },
  { path: 'alojamiento/:id', component: AlojamientoComponent, pathMatch: 'full' },
  { path: 'cuenta/misReservas', component: MisReservasComponent, pathMatch: 'full' },
  { path: 'isla/:nombre', component: IslaComponent },
  { path: 'cuenta/informacion', component: InformacionPersonalComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
