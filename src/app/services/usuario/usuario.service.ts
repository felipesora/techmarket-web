import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtualizarSenhaDTO, UsuarioResponse, UsuarioUpdateDTO } from '../../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/techmarket-identity-service/usuarios';
  
  constructor(private http: HttpClient) {}

  getUsuarioPorId(id: number): Observable<UsuarioResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<UsuarioResponse>(`${this.API}/${id}`, { headers });
  };

  atualizarDadosUsuario(id: number, usuarioUpdate: UsuarioUpdateDTO): Observable<UsuarioResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<UsuarioResponse>(`${this.API}/${id}`, usuarioUpdate, { headers });
  };

  atualizarSenha(id: number, atualizarSenhaDTO: AtualizarSenhaDTO): Observable<void> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch<void>(`${this.API}/${id}/senha`, atualizarSenhaDTO, { headers });
  };

  deletarUsuario(id: number): Observable<void> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.API}/${id}`, { headers });
  };
}
