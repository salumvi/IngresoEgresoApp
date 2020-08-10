import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as acctionIE from '../ingreso-egreso/ingreso-egreso.actions';
import { unSetUser } from '../auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy{

  userSubcription: Subscription;
  ingresoEgresosSubcription: Subscription;
  constructor(
    private ies: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {

   this.userSubcription = this.store.select('user')
    .pipe(filter( auth => auth.user != null))
    .subscribe(state => // desectructuracion {user} para coger el user solo
      {
       this.ingresoEgresosSubcription = this.ies.getIngresoEgresoListener(state.user.uid)
        .subscribe(ingresoEgresos => {
        
          this.store.dispatch(acctionIE.setItems({items: ingresoEgresos}));
        });
      });
   
    
  }
  ngOnDestroy(): void {
    this.ingresoEgresosSubcription.unsubscribe();
    this.userSubcription.unsubscribe();
  }
  

}
