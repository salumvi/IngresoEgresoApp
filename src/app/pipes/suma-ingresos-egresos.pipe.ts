import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../modelos/ingreso-egreso';

@Pipe({
  name: 'sumaIngresosEgresos'
})
export class SumaIngresosEgresosPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): number {
    let suma = 0;
    items.forEach(i => 
      {
        console.log(i.monto);
        suma += i.monto;
      });
      console.log(suma);
    return suma;
  }

}
