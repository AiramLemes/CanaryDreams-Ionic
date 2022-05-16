import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { environment } from '../environments/environment';
import { AngularFireAuthModule} from '@angular/fire/compat/auth'
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { ReactiveFormsModule } from '@angular/forms';
import { IslaService } from './services/islas/islas.service';
import { AlojamientosService } from './services/alojamientos/alojamientos.service';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { MisReservasComponent } from './cuenta/mis-reservas/mis-reservas.component';
import { InformacionPersonalComponent } from './cuenta/informacion-personal/informacion-personal.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { IslaComponent } from './isla/isla.component';
import { AlojamientoComponent } from './alojamiento/alojamiento.component';
import { MenuComponent } from './cuenta/menu/menu.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, 
    HomeComponent, LoginComponent, RegisterComponent, MisReservasComponent, InformacionPersonalComponent,
    BuscadorComponent, IslaComponent, AlojamientoComponent, MenuComponent],
  
  entryComponents: [],

  imports: [IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, IslaService, AlojamientosService, AuthService, StorageService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
