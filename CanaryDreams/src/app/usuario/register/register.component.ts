import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})



export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    sexo: new FormControl(''),
    fecha: new FormControl(''),
    telefono: new FormControl(''),
    dni: new FormControl('')
  })




  constructor(private authService: AuthService) { }

  onRegister() {
    const {email, password, nombre, apellidos, sexo, fecha, telefono, dni} = this.registerForm.value;
    this.authService.register(email, password, nombre, apellidos, 
      sexo, fecha, telefono, dni);
  }

  ngOnInit(): void {
  }

}
