import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientosService } from 'src/app/services/alojamientos/alojamientos.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
})
export class MisReservasComponent implements OnInit {

  constructor(private alojamientos: AlojamientosService, private path: Router, private user: AuthService, private almacenamiento: StorageService) { }

  misReservas: Alojamiento[] = [];

  async ngOnInit(): Promise<any> {

      this.misReservas = await this.alojamientos.getMisReservas(this.user.getUid());
      console.log(this.misReservas)
  }

    eliminar(id: string) {
        
        let confirmacion = confirm("¿Está seguro de que quiere cancelar esta reserva?");
        
        if (confirmacion) {
            this.alojamientos.eliminarReserva(id, this.user.getUid())
            alert("Su reserva ha sido cancelada correctamente");
            this.path.navigateByUrl("")
        }

        else {
            alert("Se ha producido un error, vuelva a intentarlo")
        }


    }
}


type Alojamiento = {
  imagenes:{imagen: string},

  informacionGeneral: {
      titulo: string
  },

  id: string,

  alquiler: {
      precio: string
  },

  direccion: {
      ciudad: string, 
      isla: string
  }
}
