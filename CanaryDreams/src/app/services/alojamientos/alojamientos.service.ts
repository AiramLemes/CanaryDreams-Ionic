import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {
    
    

    constructor(private db: AngularFirestore) { 

    }

    getAlojamientosHome() {  
        return new Promise<any>((resolve) => {
            this.db.collection("alojamientos", ref =>
            ref.limit(6))
            .valueChanges({idField: 'id'})
            .subscribe(alojamiento =>  resolve(alojamiento));
        })
    }

    getAlojamientosIsla(isla: string) {  

        return new Promise<any>((resolve) => {
            this.db.collection("alojamientos", ref =>
                ref.where("isla", "==", isla).limit(6))
                .valueChanges({idField: 'id'})
                .subscribe(alojamiento =>  resolve(alojamiento));
            })
    }

    crearAlojamiento(id: string, tipo: string) {
        this.db.collection("alojamientos").doc(id).set({tipo: tipo})
    }

    getAllAlojamientos() {
        return new Promise<any>((resolve) => {
            this.db.collection("alojamientos")
            .valueChanges({idField: 'id'})
            .subscribe(alojamiento =>  resolve(alojamiento));
        })
    }


    async getAlojamiento(id: string) {
        return await new Promise<any>((resolve) => {
            this.db.collection("alojamientos").doc(id)
            .valueChanges({idField: 'id'})
            .subscribe(alojamiento =>  resolve(alojamiento));
        })
    }
    

    guardarDatosAlojamiento(id: string, dir: any) {
        this.db.collection("alojamientos").doc(id).update(dir);
    }

    guardarReferenciaAlojamientoEnUser (userId:string, idAlojamiento:string) {
        var ref = "alojamientos/" + idAlojamiento
    
        this.db.collection("usuarios").doc(userId).update({
            alojamientos: arrayUnion(ref)
        })
    }


    async getMisAlojamientos(uid: string) {
        const alojamientos: any = [];

        await this.db.collection("usuarios").doc(uid).get().subscribe((e) => {
            
            e.get("alojamientos").forEach((element: any) => {
                
                var parts = element.split("/");
                this.db.collection(parts[0]).doc(parts[1]).valueChanges({idField: 'id'}).subscribe((alojamiento) => {
                    alojamientos.push(alojamiento)
                })

            });

        })

        return alojamientos
    }




    eliminarAlojamiento(id: string, userId: string) {
        
        this.db.collection("alojamientos").doc(id).delete().then(()=> {

            var ref = "alojamientos/" + id
    
            this.db.collection("usuarios").doc(userId).update({
                alojamientos: arrayRemove(ref)
            })

        })
        
    }

}
