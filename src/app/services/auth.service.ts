import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  initAutListener(){

    return this.auth.authState.subscribe(fuser =>{
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);

    });
  }


  crearUsuario(nombre: string, correo: string, password: string){

    return this.auth.createUserWithEmailAndPassword(correo, password)
    // desestructuracion de lo que venga, en este caso necesito el user:
                .then( ({user}) => {
                  const newUser =new Usuario(user.uid, nombre, correo);
                  // la posteo a firebase para guardarla
                  return this.firestore.doc(`${user.uid}/usuario`).set({...newUser}); //devuelvo esta promesa
                });
  }


  login(correo: string, password: string){
    return this.auth.signInWithEmailAndPassword(correo, password);

  }


  logout(){
    
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe( 
      map( fuser => fuser != null)
      );
  }
}
