import { Routes } from '@angular/router';
import { JogadoresComponent } from './jogadores/jogadores.component';
import { MenuComponent } from './template/menu/menu.component';
import { PainelComponent } from './sistema/painel/painel.component';
import { JogadoresFormComponent } from './jogadores/jogadores-form/jogadores-form.component';
import { LoginComponent } from './login/pages/login/login.component';
import { AuthGuard } from './auth-guard.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'sistema', component: MenuComponent, canActivate: [AuthGuard],children : [
        { path: '', component: PainelComponent},
        { path: 'home', component: PainelComponent},
        { path: 'jogadores', component: JogadoresComponent },
        { path: 'jogadores/form', component: JogadoresFormComponent}
    ]},
    { path: '**', redirectTo: '' } 
    
];
