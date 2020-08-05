import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    private route: Router ) { }

  ngOnInit( ): void {
    this.loginForm = this.fb.group({
      correo: ['juan1@email.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }

  login(){
    if(this.loginForm.invalid) {
      return ;
    }
    Swal.fire({
      title: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading();
    }
  });



    const {correo, password} = this.loginForm.value;
    this.as.login(correo, password)
        .then( credencieles =>{
          console.log(credencieles);
          Swal.close();
          this.route.navigate(['/']);

        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
            
          })
        });

  }

}
