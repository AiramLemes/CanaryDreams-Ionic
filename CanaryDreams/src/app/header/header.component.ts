import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  anfitrionButton!: any;

  constructor(private authService: AuthService, private router: Router) {
      
  }

  ngOnInit(): void {
      this.anfitrionButton = document.getElementsByClassName('anfitrion')[0];
      this.mostrarAnfitrion();
  }

  
  redireccionar(componente: string) {
      // Si el nombre de la ruta no existe se genera un error.
      if (this.authService.currentUser()) {
          this.router.navigateByUrl("/cuenta/"+ componente);
      }

      else {
          alert("Primero debes iniciar sesión")
          this.router.navigateByUrl('/login');
      }

  }

  mostrarAnfitrion() {
      this.authService.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.anfitrionButton.style.display = "block";
      } else {
                this.anfitrionButton.style.display = "none";
      }
      });
  }
  

  logOut() {

      this.authService.logOut();
      
  }
  

}
