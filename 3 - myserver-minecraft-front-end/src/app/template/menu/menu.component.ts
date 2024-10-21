import { ChangeDetectorRef, Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,HttpClientModule,RouterOutlet ,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  mobileQuery: MediaQueryList;
  isBrowser: boolean;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    
  }

  shouldRun(): boolean {
    return this.isBrowser && /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  }

  navigateJogadores(){
    this.router.navigate(['/sistema/jogadores']);
  }

  sair(){
    sessionStorage.removeItem("auth_token");
    sessionStorage.setItem("auth_token", "null");
    this.router.navigate(['']);
  }
}
