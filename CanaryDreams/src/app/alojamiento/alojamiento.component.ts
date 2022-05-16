import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../services/alojamientos/alojamientos.service';


@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent implements OnInit {

    id!: any;
    alojamiento: any;

    constructor(private route: ActivatedRoute, private alojamientoService: AlojamientosService, private path: Router) { 
        this.id = this.route.snapshot.paramMap.get('id');
    }



    ngOnInit(): void {

        this.alojamientoService.getAlojamiento(this.id).then((alojamiento: any) => {
            this.alojamiento = alojamiento;
        })

    }


}
