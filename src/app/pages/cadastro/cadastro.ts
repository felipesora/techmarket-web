import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  mostrarSenha = false;

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
