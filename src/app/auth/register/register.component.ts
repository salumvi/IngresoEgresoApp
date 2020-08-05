import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private as: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.registroForm= this.fb.group({
      nombre: ['juan', Validators.required],
      correo: ['juan1@email.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });



  }

  crearUsuario(){

    if (this.registroForm.invalid){return;  }

    Swal.fire({
      title: 'Espere por favor...',
      onBeforeOpen: () => {
        Swal.showLoading();
    }
  });

    const {nombre, correo, password } = this.registroForm.value;

    this.as.crearUsuario(nombre, correo, password)
      .then(credenciales =>{
          console.log(credenciales);
          Swal.close();
          this.route.navigate(['/']);
      }).catch(err=> {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });

  }

}
