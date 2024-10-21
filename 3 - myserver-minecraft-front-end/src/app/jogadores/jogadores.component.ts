import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { MatListModule } from '@angular/material/list'; 



import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Jogador } from './Jogador';
import { JogadoresService } from '../services/jogadores.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jogadores',
  standalone: true,
  imports: [MatTabsModule
    , HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule,
    MatStepperModule,],
  templateUrl: './jogadores.component.html',
  styleUrl: './jogadores.component.scss',
  providers: [JogadoresService]
})
export class JogadoresComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nome', 'email', 'status'];
  jogadoresDataSource!: MatTableDataSource<Jogador>;

  constructor(private jogadoresService: JogadoresService, private router: Router){}

  ngOnInit(): void {
    this.listarContatos();
  }

  listarContatos() {
    this.jogadoresService.list().subscribe(
      (response: any) => {
        this.jogadoresDataSource = new MatTableDataSource<any>(response);
      },
      (error) => {
        console.error('Erro ao carregar jogadores', error);
        // Exibir mensagem de erro para o usuário
      }
    );
  }

  navigateFormJogadores(){
    this.router.navigate(['/sistema/jogadores/form']);
  }
}
