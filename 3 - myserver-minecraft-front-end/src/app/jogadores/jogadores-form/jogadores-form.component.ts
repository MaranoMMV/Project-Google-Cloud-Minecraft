import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Jogador } from '../Jogador';
import { Direito } from '../Direito';
import { JogadoresService } from '../../services/jogadores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jogadores-form',
  standalone: true,
  imports: [MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    MatStepperModule],
  templateUrl: './jogadores-form.component.html',
  styleUrl: './jogadores-form.component.scss',
  providers: [JogadoresService]
})
export class JogadoresFormComponent implements OnInit {

  formulario!: FormGroup;
  id?: number;
  jogador?: Jogador;
  jogadores: Jogador[] = [];
  direitos: Direito[] = [];

  constructor(
    private fb: FormBuilder,
    private jogadorService: JogadoresService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['',  Validators.required],
      password: ['', Validators.required],
      status: [''],
    });
  }


  onSubmit() {
      const formValues = this.formulario.value;
      const jogador: Jogador = new Jogador(
        formValues.id,
        formValues.nome,
        formValues.email,
        formValues.password,
        formValues.status
      );
      (jogador);
        this.jogadorService.save(jogador).subscribe(resposta => {
          let lista: Jogador[] = [...this.jogadores, resposta];
          this.jogadores = lista;
          this.openSnackBar("Jogador Criado com sucesso!!", "fechar");
          this.router.navigate(['sistema/jogadores']);
        });

    
  }

  voltarListagem() {
    this.router.navigate(['sistema/jogadores']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
