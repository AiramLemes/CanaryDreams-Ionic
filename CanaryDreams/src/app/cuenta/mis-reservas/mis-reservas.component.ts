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

  misReservas: Alojamiento[] = []

  async ngOnInit(): Promise<any> {

      this.misReservas = await this.alojamientos.getMisAlojamientos(this.user.getUid());
  }

  eliminar(id: string) {
      console.log(id)
      let confirmacion = confirm("¿Está seguro de que quiere eliminar su alojamiento?");

      if (confirmacion) {

          if (confirmacion) {
              this.alojamientos.eliminarAlojamiento(id, this.user.getUid())
              this.almacenamiento.eliminarAlojamiento(id);
              alert("Su alojamiento ha sido eliminado correctamente");
              this.path.navigateByUrl("")
          }

          else {
              alert("Se ha producido un error, vuelva a intentarlo")
          }
          

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
