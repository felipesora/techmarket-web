import { Injectable } from '@angular/core';
import { TokenPayload } from '../../types/token';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/carrinho.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, private carrinhoService: CarrinhoService) {}

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
    localStorage.removeItem('produtos-favoritos');
    this.carrinhoService.limparCarrinho();

    this.router.navigate(['/']);
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

  getPerfilUsuario(): string | null {
    return localStorage.getItem('perfil');
  }
}
