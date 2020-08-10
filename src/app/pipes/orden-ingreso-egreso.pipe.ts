import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../modelos/ingreso-egreso';
import { collectExternalReferences } from '@angular/compiler';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    //el array está bloqueado ya hay que hacer una copia con el ... o con otro método , por ejemplo slice().
    const inew = [...items];
  

    inew.sort((a, b) => {
       if (a.tipo === 'ingreso') {
         return -1;
       } else {
         return 1;
       }
     });
    return inew;
  }

}
