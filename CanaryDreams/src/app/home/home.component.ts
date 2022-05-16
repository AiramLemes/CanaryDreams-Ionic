import { Component, OnInit } from '@angular/core';
import { AlojamientosService } from '../services/alojamientos/alojamientos.service';
import { IslaService } from '../services/islas/islas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit{

  islas!: Isla[];
  alojamientos!: any[];
  constructor(private islaService: IslaService, private alojamientosService: AlojamientosService) {
  }


  ngOnInit(): void {
      this.islaService.getIslas().then((value) => {
          this.islas = value;
          console.log(value)
      })

      this.alojamientosService.getAlojamientosHome().then((value) => {
          this.alojamientos = value;
          console.log(value)
      });
  }
  

}


type Isla = {
  imagenHome: string;
  nombre: string;
}
