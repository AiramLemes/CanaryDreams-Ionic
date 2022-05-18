import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../services/alojamientos/alojamientos.service';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-alojamiento',
  templateUrl: './alojamiento.component.html',
  styleUrls: ['./alojamiento.component.scss']
})
export class AlojamientoComponent implements OnInit {

    id!: any;
    alojamiento: any;

    constructor(private route: ActivatedRoute, private alojamientoService: AlojamientosService, private path: Router, private user: AuthService) { 
        this.id = this.route.snapshot.paramMap.get('id');
    }



    ngOnInit(): void {

        this.alojamientoService.getAlojamiento(this.id).then((alojamiento: any) => {
            this.alojamiento = alojamiento;
        })

    }



    crearReserva():void {
        
        if (this.user.currentUser()) {
            this.alojamientoService.crearReserva(this.id, this.user.getUid())
            alert("La reserva se ha realizado correctamente")
            this.path.navigateByUrl("/")
        }

        else {
            alert("Para realizar una reserva, es necesario iniciar sesión!")
        }

       
    }


}
