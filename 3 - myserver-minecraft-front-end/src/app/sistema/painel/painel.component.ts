import { Component, OnInit } from '@angular/core';
import { PainelService } from '../../services/painel.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../template/menu/menu.component';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule,MatIconModule, MenuComponent],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss',
  providers: [PainelService]
})
export class PainelComponent implements OnInit {

  statusVm!: string;

  constructor(private painelService: PainelService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.statusVM();
  }

  statusVM() {
    this.painelService.statusVm().pipe(
        map(response => response) // Supondo que a resposta seja um objeto JSON com uma propriedade "status"
    ).subscribe(
        status => {
            this.statusVm = status.toString();
        }
    );
}



  ligarVM() {
    this.openSnackBar("Ligando a maquina virtual", "fechar")
    this.painelService.ligarVm().subscribe(response => {
      this.openSnackBar("Maquina virtual Ligada com sucesso!", "fechar")
    }
    )
  }

  desligarVM() {
    this.openSnackBar("Desligando a maquina virtual", "fechar")
    this.painelService.desligarVm().subscribe(response => {
      this.openSnackBar("Maquina virtual desligada com sucesso!", "fechar")
    }
    )
  }

  killVm(){
    this.openSnackBar("Desligando a maquina virtual", "fechar")
    this.painelService.killVm().subscribe(response => {
      this.openSnackBar("Maquina virtual desligada com sucesso!", "fechar")
    })
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
