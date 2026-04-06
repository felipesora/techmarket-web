import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../../types/usuario';

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
}
