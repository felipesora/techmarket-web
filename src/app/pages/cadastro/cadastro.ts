import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity/identity.service';
import { UsuarioCadastro } from '../../types/usuario';
import {
  confirmarSenhaValidator,
  cpfValidator,
  emailValidator,
  nomeValidator,
  senhasIguaisValidator,
  senhaValidator,
} from './validatorsCadastro';
import { NgxMaskDirective } from 'ngx-mask';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, ReactiveFormsModule, NgxMaskDirective, NgClass],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  mostrarSenha = false;
  form!: FormGroup;
  submitted = false;

  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group(
      {
        nome: ['', nomeValidator()],
        email: ['', emailValidator()],
        cpf: ['', cpfValidator()],
        senha: ['', senhaValidator()],
        confirmarSenha: ['', confirmarSenhaValidator()],
      },
      {
        validators: senhasIguaisValidator,
      },
    );
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  cadastrar() {
    this.submitted = true;
    this.mensagem = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioFormulario = this.form.value;

    const cpfSemMascara = usuarioFormulario.cpf.replace(/\D/g, '');

    const usuario: UsuarioCadastro = {
      nome: usuarioFormulario.nome,
      email: usuarioFormulario.email,
      cpf: cpfSemMascara,
      senha: usuarioFormulario.senha,
      perfil: "USUARIO",
    };

    this.identityService.criarUsuario(usuario).subscribe({
      next: () => {
        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Cadastro efetuado com sucesso!';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro HTTP:', err);
        console.log('Erro completo: ', err.error);
        console.log(err.error.errors);
        console.log('Mensagem: ', this.mensagem);

        if (err.status === 0) {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Servidor indisponível. Tente novamente em instantes.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        if (err.status === 400) {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Dados inválidos. Verifique os campos.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        if (err.status >= 500) {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Erro interno do servidor. Tente novamente mais tarde.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao cadastrar. Tente novamente mais tarde.';
        this.cdr.detectChanges();
        console.log('Mensagem: ', this.mensagem);
      },
    });
  }
}
