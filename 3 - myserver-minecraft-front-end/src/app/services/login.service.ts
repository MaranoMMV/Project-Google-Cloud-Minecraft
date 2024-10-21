import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../login/LoginResponse';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  apiUrl: string = "https://thebuilder-teste2.uc.r.appspot.com/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth_token", value.token);
      })
    );
  }
}