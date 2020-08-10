import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../modelos/ingreso-egreso';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private as: AuthService
   ) { }



  crearIngersoEgreso(ingresoEgreso: IngresoEgreso) {

    // notenomos el uid y lo exclujimos del objeto
    delete ingresoEgreso.uid;
    return this.fireStore.doc(`${this.as.user.uid}/ingreso-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });


  }

  getIngresoEgresoListener(uid: string){
    
   return this.fireStore.collection(`${uid}/ingreso-egresos/items`)
   .snapshotChanges()
   .pipe(
     map(snapshot => snapshot.map( doc => ({uid: doc.payload.doc.id, ... doc.payload.doc.data() as any})))
   );
  }
    
  borrarIngresoEgreso(uidItem: string){
    const uid =this.as.user.uid;
    return this.fireStore
      .doc(`${uid}/ingreso-egresos/items/${uidItem}`)
      .delete();
  }


}
