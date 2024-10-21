import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainelService {
  url: string = 'https://thebuilder-teste2.uc.r.appspot.com/api/vms'

  constructor(private http: HttpClient) { }

  ligarVm(): Observable<any>{
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
        'Authorization': 'Bearer ' + tokenString
    };
    return this.http.get<any>(`${this.url}/iniciar`, { headers } )
  }
  desligarVm(): Observable<any>{
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
        'Authorization': 'Bearer ' + tokenString
    };
    return this.http.get<any>(`${this.url}/parar`, { headers } )
  }
  
  killVm(): Observable<any>{
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
        'Authorization': 'Bearer ' + tokenString
    };
    return this.http.get<any>(`${this.url}/kill`, { headers } )
  }
  
  statusVm() {
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
        'Authorization': 'Bearer ' + tokenString
    };
    return this.http.get(`${this.url}/status`,{headers, responseType: 'text' });
  }


}
