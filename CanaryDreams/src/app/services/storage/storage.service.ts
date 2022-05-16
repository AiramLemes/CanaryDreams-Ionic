import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  //Tarea para subir archivo
  public async tareaCloudStorage(nombreArchivo: string, datos: any, id: string) {
    return await this.storage.ref("alojamientos").child(id + "/" + nombreArchivo).put(datos)
    
  }

  //Referencia del archivo
  public async referenciaCloudStorage(nombreArchivo: string, id: string) {
    
    return await this.storage.ref("alojamientos").child(id + "/" + nombreArchivo)
  }


  public async eliminarAlojamiento(id: string) {

    await this.storage.ref("alojamientos").child(id).delete()
    
  }
}
