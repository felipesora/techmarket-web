import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nao-encontrado',
  imports: [RouterLink],
  templateUrl: './nao-encontrado.html',
  styleUrl: './nao-encontrado.css',
})
export class NaoEncontrado {

  constructor(private authService: AuthService) {}

  isUsuarioLogado(): boolean {
    const idUsuario = localStorage.getItem('idUsuarioLogado');
    return idUsuario ? true : false;
  }

  getPerfilUsuario() {
    return this.authService.getPerfilUsuario();
  }
}
