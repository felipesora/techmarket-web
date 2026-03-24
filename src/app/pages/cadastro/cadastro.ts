import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Identity } from '../../services/identity/identity';
import { UsuarioCadastro } from '../../types/usuario';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  mostrarSenha = false;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private identityService: Identity) {
    this.form = this.formBuilder.group({
      nome: [''],
      email: [''],
      cpf: [''],
      senha: [''],
      confirmarSenha: ['']
    });
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  cadastrar() {
    if (this.form.invalid) return;

    const usuarioFormulario = this.form.value;

    const usuario:UsuarioCadastro = {
      nome: usuarioFormulario.nome,
      email: usuarioFormulario.email,
      cpf: usuarioFormulario.cpf,
      senha: usuarioFormulario.senha,
      id_perfil: 2
    }

    this.identityService.criarUsuario(usuario).subscribe({
      next: (response) => {
        console.log('Usuário criado:', response);
      },
      error: (err) => {
        console.log(err.error);
        console.log(err.error.errors);
      }
    });
  }

}
