import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';




@Injectable() 

export class IslaService {


    itemsCollection!: AngularFirestoreCollection<Isla>;

    constructor(private db: AngularFirestore) {}


    getIslas() {  
        return new Promise<any>((resolve) => {
            this.db.collection("islas")
            .valueChanges({idField: 'id'})
            .subscribe(isla =>  resolve(isla));
        })
    }


    getInformacionIsla(nombre: string) {
        return new Promise<any>((resolve) => {
        this.db.collection('islas', ref => ref.where('nombre', '==', nombre))
        .valueChanges()
        .subscribe(isla =>  resolve(isla));
    })
      
    }

}

interface Isla {
    coordenadas?: string;
    imagen1?: string;
    imagen2?: string;
    imagen3?: string;
    imagen4?: string;
    imagen5?: string;
    imagen6?: string;
    imagenHome?: string;
    nombre?: string;
    textos?: string;
    
}
