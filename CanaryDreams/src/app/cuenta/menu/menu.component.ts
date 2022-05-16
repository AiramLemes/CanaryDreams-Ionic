import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
        
  }


  ngOnInit(): void {
    
    let element1: any;

    switch (this.router.url) {
      
      case "/cuenta/informacion":
        element1 = document.getElementsByClassName("informacion")[0];
        element1.style.fontWeight = "bold";
        break;

      case "/cuenta/misReservas":
        element1 = document.getElementsByClassName("misReservas")[0];
        element1.style.fontWeight = "bold";
        break;

      case "/cuenta/misAlojamientos":
        element1 = document.getElementsByClassName("gestionar")[0];
        element1.style.fontWeight = "bold";
        break;

  }

  }

  logOut() {
    this.authService.logOut();
  }

}
