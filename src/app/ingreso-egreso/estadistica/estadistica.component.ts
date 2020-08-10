import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../modelos/ingreso-egreso';
import { Subscription } from 'rxjs';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;
  ingresosEgresosSub: Subscription;
  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  constructor(
    private stote: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.ingresosEgresosSub.unsubscribe();
  }

  ngOnInit(): void {

    this.ingresosEgresosSub = this.stote.select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.generarEstadistica(items);
      });
  }

  generarEstadistica(items: IngresoEgreso[]): void {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    items.forEach(i => {
      if (i.tipo === 'ingreso') {
        this.ingresos += i.monto;
        this.totalIngresos++;
      } else {
        this.egresos += i.monto;
        this.totalEgresos++;
      }
    });

    this.doughnutChartData = [[this.ingresos, this.egresos]];
  }

}
