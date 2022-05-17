import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})



export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        email: new FormControl('', Validators.email),
        repeatedEmail: new FormControl('', Validators.email),
        password: new FormControl(''),
        repeatedPassword: new FormControl(''),
        nombre: new FormControl('', Validators.required),
        apellidos: new FormControl('', Validators.required),
        sexo: new FormControl('', Validators.required),
        fecha: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        dni: new FormControl('', Validators.required)
    })




    constructor(private authService: AuthService) { }

    onRegister() {

        if (this.formValidation()) {

        const {email, password, nombre, apellidos, sexo, fecha, telefono, dni} = this.registerForm.value;
        console.log(this.registerForm.value)
        this.authService.register(email, password, nombre, apellidos, sexo, fecha, telefono, dni);
        }

    }

    ngOnInit(): void {
    }



    formValidation(): boolean {

        const nombre: any = document.getElementsByClassName("camposRegistrarse")[0];
        const apellidos: any = document.getElementsByClassName("camposRegistrarse")[1];
        const sex: any = document.getElementsByClassName("camposRegistrarse")[2];
        const fechaNacmiento: any = document.getElementsByClassName("camposRegistrarse")[3];
        const telefono: any = document.getElementsByClassName("camposRegistrarse")[4];
        const dni: any = document.getElementsByClassName("camposRegistrarse")[5];
        const email: any = document.getElementsByClassName("camposRegistrarse")[6];
        const email2: any = document.getElementsByClassName("camposRegistrarse")[7];
        const password: any = document.getElementsByClassName("camposRegistrarse")[8];
        const password2: any = document.getElementsByClassName("camposRegistrarse")[9];

        let validate = true;

            if(nombre.value == "" || apellidos.value == "" || fechaNacmiento.value == "" || telefono.value == "" || dni.value == "") {
                validate = false;
                alert("Todos los campos tienen que ser rellenados")
            }

            if (email.value == email2.value) {
                validate = true;
                email2.style.border = "2px solid";

            } 
            else {
                email2.style.border = "2px solid #e24a4a";
                validate = false;
                alert("Los emails deben ser iguales!");// invalid
                
            }


            if (password.value === password2.value) {
                validate = true;
                password2.style.border = "2px solid";
            } 
            else {
                password2.style.border = "2px solid #e24a4a";
                validate = false;
                alert("Las contraseñas deben ser iguales!");// invalid
            }

            if (sex.value != 0) {
                validate = true;
                sex.style.border = "2px solid black";
            } 
            else {
                sex.style.border = "2px solid #e24a4a";
                validate = false;
                alert("Debe escoger una opcion (sexo)");// invalid
            }
            console.log(validate)
            return validate;
    }   
 
}




