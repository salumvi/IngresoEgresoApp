import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  isloading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private as: AuthService,
    private store: Store<AppState>,
    private route: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['juan', Validators.required],
      correo: ['juan1@email.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isloading = ui.isLoading;
    });



  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();

  }
  crearUsuario() {

    if (this.registroForm.invalid) { return; }

    this.store.dispatch(uiActions.loading());
    // Swal.fire({
    // title: 'Espere por favor...',
    // onBeforeOpen: () => {
    // Swal.showLoading();
    // }
    // });

    const { nombre, correo, password } = this.registroForm.value;

    this.as.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(uiActions.stopLoading());

        this.route.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });

  }

}
