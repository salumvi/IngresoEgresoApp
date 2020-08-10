import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
 

  constructor(
    private as: AuthService,
   ) {

    this.as.initAutListener();

  }

 }
