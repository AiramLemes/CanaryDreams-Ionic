import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent implements OnInit {

  constructor(private user: AuthService, private router: Router, private firebaseStorage: StorageService) {}

  fotoPerfil: string;
  private uid: string;

  personalData = new FormGroup ({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    fecha: new FormControl(''),
    sexo: new FormControl(''),
    correo: new FormControl(''),
    archivo: new FormControl('')

  })

  archivoForm = new FormGroup ({
      archivo: new FormControl(''),
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
        this.fotoPerfil = data.get!("fotoPerfil")
      })

      this.uid = this.user.getUid();
      console.log(this.uid)
    
  }

  public datosFormulario = new FormData();
  public nombreArchivo = '';
  


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

    public cambioArchivo(event: any) {
        if (event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                this.nombreArchivo = event.target.files[i].name;
                this.datosFormulario.delete('archivo');
                this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
            }
        } else {}
    }



    public async subirArchivo() {

        if (this.datosFormulario.get('archivo')) {

            let archivo = this.datosFormulario.get('archivo');
            await this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo, this.uid);
            let referencia = await this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo, this.uid);
            
            await referencia.getDownloadURL().subscribe((URL) => {
                this.user.actualizarFotoPerfil(URL);
                alert("Su foto de perfil se ha cambiado correctamente")
                this.router.navigateByUrl("/")
            });
                
            
            this.datosFormulario.delete('archivo');
            this.archivoForm.get("archivo")?.reset()
        
        }

        else {
            alert("No ha seleccionado ningún archivo.")
        }
    }


}
