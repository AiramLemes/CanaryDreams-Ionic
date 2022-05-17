import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlojamientosService } from '../services/alojamientos/alojamientos.service';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

    constructor(private alojamiento: AlojamientosService) { }

    alojamientos: any[] = [];
    allAlojamientos: any[] = [];

    async ngOnInit(): Promise<void> {
        await this.alojamiento.getAllAlojamientos().then((value) => {
            this.allAlojamientos = value;
        })
        this.alojamientos = this.allAlojamientos
    }

    

    buscador = new FormGroup ({
        buscar: new FormControl("")
    });
    

    buscar(event: any) {
        var buscar:string = this.buscador.get("buscar")!.value
        buscar = buscar.toLowerCase()
    

        switch (buscar) {

            case "":
                this.alojamientos = this.allAlojamientos
                break;

            case "gran canaria":
                this.alojamiento.getAlojamientosIsla("Gran Canaria").then((value) => {
                    this.alojamientos = value;
                })
                break;
            
            case "fuerteventura":
                this.alojamiento.getAlojamientosIsla("Fuerteventura").then((value) => {
                    this.alojamientos = value;
                })
                break;

            case "la graciosa":
                this.alojamiento.getAlojamientosIsla("La Graciosa").then((value) => {
                        this.alojamientos = value;
                })
                break;

            case "tenerife":
                this.alojamiento.getAlojamientosIsla("Tenerife").then((value) => {
                        this.alojamientos = value;
                })
                break;

            case "la gomera":
                this.alojamiento.getAlojamientosIsla("La Gomera").then((value) => {
                        this.alojamientos = value;
                })
                break;

            case "la palma":
                this.alojamiento.getAlojamientosIsla("La Palma").then((value) => {
                        this.alojamientos = value;
                })
                break;

            case "lanzarote":
                this.alojamiento.getAlojamientosIsla("Lanzarote").then((value) => {
                        this.alojamientos = value;
                })
                break;

            case "el hierro":
                this.alojamiento.getAlojamientosIsla("El Hierro").then((value) => {
                        this.alojamientos = value;
                })
                break;
            
            default:
                this.alojamientos = [];
                this.allAlojamientos.forEach(element => {
                    if (element.informacionGeneral.descripcion.toLowerCase().includes(buscar.toLowerCase())) {
                        this.alojamientos.push(element)
                        return
                    }

                    if (element.informacionGeneral.titulo.toLowerCase().includes(buscar.toLowerCase())) {
                        this.alojamientos.push(element)
                        return
                    }

                    if (element.direccion.ciudad.toLowerCase().includes(buscar.toLowerCase())) {
                        this.alojamientos.push(element)
                        return
                    }

                    if (element.alquiler.precio.toString().toLowerCase().includes(buscar.toLowerCase())) {
                        this.alojamientos.push(element)
                    }
                });
                break;

        }
        
    }
  

}

/*
type Alojamiento = {
    id: string;
    imagen: string;
    nombre: string;
    localidad: string;
    precio: string;
    valoracion: string;
}*/