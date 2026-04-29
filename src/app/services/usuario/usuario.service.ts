import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtualizarSenhaDTO, AtualizarStatusDTO, UsuarioPageResponse, UsuarioResponse, UsuarioUpdateDTO } from '../../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/techmarket-identity-service/usuarios';
  
  constructor(private http: HttpClient) {}

  getUsuariosAdmins(page: number = 0, size: number = 10): Observable<UsuarioPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<UsuarioPageResponse>(`${this.API}/admins`, { headers, params });
  };

  getUsuariosComuns(page: number = 0, size: number = 10): Observable<UsuarioPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<UsuarioPageResponse>(`${this.API}/usuarios-comuns`, { headers, params });
  };

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

  atualizarStatus(id: number, status: AtualizarStatusDTO): Observable<void> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch<void>(`${this.API}/${id}/status`, status, { headers });
  };

  deletarUsuario(id: number): Observable<void> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.API}/${id}`, { headers });
  };

  getQuantidadeUsuarios(): Observable<number> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<number>(`${this.API}/total-usuarios-ativos`, { headers });
  };
}
