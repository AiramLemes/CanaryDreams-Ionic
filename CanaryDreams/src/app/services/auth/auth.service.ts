import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable()

export class AuthService {

  
	private user: any;

	constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { 
		afAuth.onAuthStateChanged((user) => {
			if (user) {
				this.user = user;
				console.log("Usuario logueado")
			} else {
			  this.user = null;
			  console.log("No hay usuario logueado")
			}
		  });
	}



	async login (email:string, password:string) {

		if (!this.user) {

			await this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => { 
				alert("Enhorabuena, ha iniciado sesión correctamente.")
				window.location.assign('/')
			});	

		}

		else {
			alert("Ya hay una sesión abierta. Si quiere usar otra cuenta, cierre sesión");
		}
		
		
	
	}




	async register (email:string, password:string, nombre:string, apellidos:string,
		 sexo:string, fecha:string, telefono: string, dni: string) {
		
		

		await this.afAuth.createUserWithEmailAndPassword(email, password)
		.then(async (userCredential) => {
			console.log(nombre, apellidos, sexo, fecha, telefono, dni)
			await this.db.collection('usuarios').
			doc(userCredential.user?.uid).
			set({nombre: nombre, apellidos: apellidos, sexo: sexo, 
			fechaDeNacimiento: fecha, telefono: telefono, dni: dni, correo: email}).then( (err) => console.log(err));
			alert('Se ha registrado correctamente');
			window.location.assign("/")
		});
		
	}

	currentUser(): boolean {


		if (this.user != null) {
			console.log("Hay un usuario logueado");
			return true;
		}

		else {
			console.log("No hay usuario logueado");
			return false;
		}


	}



	async logOut() {

		if (this.user) {

			await this.afAuth.signOut().then((value) => {

			
				alert("Se ha cerrado la sesión correctamente");
				window.location.assign('/')
	
				
			})
		}

		else {
			alert("No existe ninguna sesión en uso");
		}
	
	}




	async getUserData() {
	
		const docRef = doc(this.db.firestore, "usuarios", this.user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap;
		} 
		
		else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
			return
		}
	}


	modificarUsuario(nombre: string, apellidos: string, telefono: string) {
		
		this.db.doc("usuarios/" + this.user.uid)
		.update({nombre: nombre, apellidos: apellidos, telefono: telefono})
		
	}

	getUid(): string {
		return this.user.uid
	}

	actualizarFotoPerfil(URL: string) {
        this.db.doc("usuarios/" + this.user.uid)
		.update({fotoPerfil: URL})
    }
    

}


