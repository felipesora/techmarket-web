import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioCadastro } from '../../types/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Identity {

  private readonly API = 'http://localhost:8080/techmarket-identity-service';

  constructor(private http: HttpClient) {}

  criarUsuario(usuario: UsuarioCadastro): Observable<UsuarioCadastro> {
    return this.http.post<UsuarioCadastro>(`${this.API}/usuarios`, usuario);
  }
}
