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

  logout() {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('idUsuarioLogado');
    localStorage.removeItem('perfil');
    localStorage.removeItem('exp');
  }

  isTokenValid() {
    const token = localStorage.getItem('tokenUser');
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        this.logout();
        return false;
      }

      return true;

    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      this.logout();
      return false;
    }
  }

  isUsuarioLogado(): boolean {
    return this.isTokenValid();
  }
}
