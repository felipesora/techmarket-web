import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  mostrarSenha = false;

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
