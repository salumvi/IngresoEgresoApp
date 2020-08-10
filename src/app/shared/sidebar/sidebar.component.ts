import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit , OnDestroy{

  nombre = '';
  userSubcription: Subscription;
  constructor(
    private as: AuthService,
    private route: Router,
    private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }

  ngOnInit(): void {

    this.userSubcription = this.store.select('user')
    .pipe(filter(usuario => usuario.user != null))
    .subscribe(({user})=> {
      this.nombre = user.nombre;
    });
  }
  logout(){
  this.as.logout()
    .then(() => this.route.navigate(['/login']));
  
  }
}
