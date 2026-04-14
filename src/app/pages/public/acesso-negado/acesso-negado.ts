import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {

  isUsuarioLogado(): boolean {
    const idUsuario = localStorage.getItem('idUsuarioLogado');
    return idUsuario ? true : false;
  }
}
