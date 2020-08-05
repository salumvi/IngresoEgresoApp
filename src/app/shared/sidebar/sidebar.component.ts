import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private as: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }
  logout(){
  this.as.logout()
    .then(() => this.route.navigate(['/login']));
  
  }
}
