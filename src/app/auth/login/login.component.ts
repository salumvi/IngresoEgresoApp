import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isloading = false;
  uiSubscription: Subscription;
  constructor(
    private as: AuthService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: Router) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['juan1@email.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isloading = ui.isLoading;
      console.log('cargando subs');
    });
  }

  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe();
  }



  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.loading());
    // Swal.fire({
    //   title: 'Espere por favor...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });




    const { correo, password } = this.loginForm.value;
    this.as.login(correo, password)
      .then(credencieles => {
        console.log(credencieles);
        // Swal.close();
        this.store.dispatch(uiActions.stopLoading());

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
