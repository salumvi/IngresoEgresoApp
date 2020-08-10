import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppState, AppStateWithInEgre } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../modelos/ingreso-egreso';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgreso[] = [];
  ieSubcription: Subscription;
  nombreColumnas: string[] = ['descripcion', 'monto', 'tipo', 'accion'];
  ingresoEgresoSource: MatTableDataSource<IngresoEgreso>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private store: Store<AppStateWithInEgre>,
    private ies: IngresoEgresoService) { }


  ngOnInit(): void {

    this.ieSubcription = this.store.select('ingresosEgresos').subscribe(({items})=>{
      this.ingresoEgreso = items;
      this.ingresoEgresoSource = new MatTableDataSource(items);
      this.ingresoEgresoSource.sort = this.sort;
    }); 

  }

  ngOnDestroy(): void {
    this.ieSubcription.unsubscribe();
  }
  borrar(uid: string){
   this.ies.borrarIngresoEgreso(uid)
   .then(()=>{
     Swal.fire('Borrado', 'item borrado', 'success');
   }).catch((err) =>{
    Swal.fire('ERROR', err.mesage, 'error');

   })  }

}
