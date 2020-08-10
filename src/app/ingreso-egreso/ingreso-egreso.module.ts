import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { OrdenIngresoEgresoPipe } from '../pipes/orden-ingreso-egreso.pipe';
import { SumaIngresosEgresosPipe } from '../pipes/suma-ingresos-egresos.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoEgresoPipe,
    SumaIngresosEgresosPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresosEgresos', IngresoEgresoReducer)


  ]
})
export class IngresoEgresoModule { }
