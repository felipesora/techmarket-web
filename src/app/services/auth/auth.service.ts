import { Injectable } from '@angular/core';
import { TokenPayload } from '../../types/token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getUsuarioToken() {
    const token = localStorage.getItem('tokenUser');
    if (!token) return null;

    const decoded = jwtDecode<TokenPayload>(token);
    localStorage.setItem('idUsuarioLogado', String(decoded.id));
    localStorage.setItem('perfil', decoded.perfil);
    localStorage.setItem('exp', String(decoded.exp));

    return decoded;
  }
}
