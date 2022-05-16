import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent implements OnInit {

  constructor(private user: AuthService, private router: Router) {}


  personalData = new FormGroup ({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    fecha: new FormControl(''),
    sexo: new FormControl(''),
    correo: new FormControl(''),

  })

  ngOnInit(): void {
    
      this.user.getUserData().then((data) =>{
        this.personalData.get("nombre")!.setValue(data!.get("nombre"))
        this.personalData.get("apellidos")!.setValue(data!.get("apellidos"))
        this.personalData.get("dni")!.setValue(data!.get("dni"))
        this.personalData.get("telefono")!.setValue(data!.get("telefono"))
        this.personalData.get("fecha")!.setValue(data!.get("fechaDeNacimiento"))
        this.personalData.get("sexo")!.setValue(data!.get("sexo"))
        this.personalData.get("correo")!.setValue(data!.get("correo"))
      })
    
  }

  


  aplicarCambios() {

    let nombre = this.personalData.get("nombre")!.value
    let apellidos = this.personalData.get("apellidos")!.value
    let telefono = this.personalData.get("telefono")!.value

    if (nombre == "" || apellidos == "" || telefono == "") {
      alert("Todos los campos tienen que ser rellenados!")
    }

    else {
      this.user.modificarUsuario(nombre, apellidos, telefono);
      alert("Los cambios se han guardado correctamente")
      this.router.navigateByUrl("/")
    }

  }
}
