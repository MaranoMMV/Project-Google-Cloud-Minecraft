import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jogador } from '../jogadores/Jogador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {
  url: string = '';

  constructor(private http: HttpClient) { }

  save(jogador: Jogador): Observable<Jogador> {
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
      'Authorization': 'Bearer ' + tokenString
  };
    return this.http.post<Jogador>(`${this.url}`, jogador, { headers });
  }

  list(): Observable<Jogador[]> {
    const tokenString = sessionStorage.getItem('auth_token'); // Use sessionStorage
    const headers = {
        'Authorization': 'Bearer ' + tokenString
    };
    return this.http.get<Jogador[]>(`${this.url}`, { headers });
}
}
