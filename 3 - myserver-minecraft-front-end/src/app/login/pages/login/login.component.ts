import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {FormControl, FormControlStatus, FormGroup, FormRecord, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../../../services/login.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

interface LoginForm {
    email: FormControl<string | null>,
    password: FormControl<string | null>
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent,
        NgIf,
        HttpClientModule,
        MatIconModule
    ],
    providers: [
        LoginService,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;
  showErroMenssage: boolean = false;

  constructor(
      private router: Router,
      private loginService: LoginService,
  ) {
      this.loginForm = new FormGroup<LoginForm>({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
      })
  }

  submit() {
      if (this.validate()) {
          this.loginService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe( (res:any) => {
                sessionStorage.setItem('auth_token', res.token);
                this.router.navigate(['/sistema']); // Redireciona para a tela de sistema após login bem-sucedido
              }, (error) => {
                this.showErroMenssage = true;
                console.error("Erro no login:", error);
              }
          );
      }
  }

  validate() {
      if (this.loginForm.valid) {
          this.showErroMenssage = false;
          return true;
      } else {
          this.showErroMenssage = true;
          return false;
      }
  }

  navigate() {
      this.router.navigate(["signup"]);
  }
}