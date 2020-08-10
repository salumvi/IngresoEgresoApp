import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as autActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  user: Usuario;
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAutListener() {

    return this.auth.authState.subscribe(fuser => {
      // el usuario puede venir o no

      if (fuser) {

        // para buscar el usuarioen firebase:

        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((fireUsuario: Usuario) => {
            const usuario: Usuario = { ...fireUsuario };
            this.user = usuario;
            this.store.dispatch(autActions.setUser({ user: usuario }));
          });
        //

      } else {
        if (this.userSubscription !== undefined) {
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(autActions.unSetUser());
        this.store.dispatch(ieActions.unSetItems());


      }

    });
  }


  crearUsuario(nombre: string, correo: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(correo, password)
      // desestructuracion de lo que venga, en este caso necesito el user:
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, correo);
        // la posteo a firebase para guardarla
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser }); // devuelvo esta promesa
      });
  }


  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);

  }


  logout() {

    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }
}
