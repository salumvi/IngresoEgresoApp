import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../modelos/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { loading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit , OnDestroy{

  ingresoForm: FormGroup;
  tipo = 'ingreso';
  cargarndo = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ies: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui')
                          .subscribe( ui => {
                            this.cargarndo = ui.isLoading;
                          });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  guardar(){

    if(this.ingresoForm.invalid){return;}

    this.store.dispatch(loading());

    const { descripcion, monto} =  this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    this.ies.crearIngersoEgreso(ingresoEgreso)
    .then(ref => {

      this.store.dispatch(stopLoading());
      // Swal.fire('Registro creado', descripcion, 'success');
      this.ingresoForm.reset();
    })
    .catch( err => {
      this.store.dispatch(stopLoading());
      Swal.fire('Error', err.message , 'error');

    });



  }
}
