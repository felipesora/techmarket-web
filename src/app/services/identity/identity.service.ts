import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, UsuarioCadastro } from '../../types/usuario';
import { Observable } from 'rxjs';
import { env } from '../../core/env';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  private readonly API = `${env.apiUrl}/techmarket-identity-service`;

  constructor(private http: HttpClient) {}

  fazerLogin(usuario : LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/auth/login`, usuario);
  }

  criarUsuario(usuario: UsuarioCadastro): Observable<UsuarioCadastro> {
    return this.http.post<UsuarioCadastro>(`${this.API}/usuarios`, usuario);
  }
}
