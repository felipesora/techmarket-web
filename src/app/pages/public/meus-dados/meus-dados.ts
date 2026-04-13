import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { AtualizarSenhaDTO, UsuarioResponse, UsuarioUpdateDTO } from '../../../types/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { confirmarSenhaValidator, cpfValidator, emailValidator, nomeValidator, novaSenhaValidator, senhaAtualValidator, senhasIguaisValidator } from './validatorsDados';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-meus-dados',
  imports: [NgxMaskDirective, RouterLink, ReactiveFormsModule],
  templateUrl: './meus-dados.html',
  styleUrl: './meus-dados.css',
})
export class MeusDados implements OnInit {

  dadosUsuario: UsuarioResponse | null = null;
  mostrarSenhaAtual = false;
  mostrarNovaSenha = false;

  formDadosUsuario!: FormGroup;
  formSenha!: FormGroup;

  submittedAtualizarDados = false;
  mensagemSucessoAtualizarDados: string | null = null;
  mensagemErroAtualizarDados: string | null = null;

  submittedAtualizarSenha = false;
  mensagemSucessoAtualizarSenha: string | null = null;
  mensagemErroAtualizarSenha: string | null = null;

  modalDeletarConta = false;
  mensagemSucessoDeletarConta: string | null = null;
  mensagemErroDeletarConta: string | null = null;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
      this.formDadosUsuario = this.fb.group({
        nome: ['', nomeValidator()],
        email: ['', emailValidator()],
        cpf: ['', cpfValidator()],
      });

      this.formSenha = this.fb.group({
        senhaAtual: ['', senhaAtualValidator()],
        novaSenha: ['', novaSenhaValidator()],
        confirmarSenha: ['', confirmarSenhaValidator()]
      },
      {
        validators: senhasIguaisValidator,
      },);
  }

  toggleSenhaAtual() {
    this.mostrarSenhaAtual = !this.mostrarSenhaAtual;
  }

  toggleNovaSenha() {
    this.mostrarNovaSenha = !this.mostrarNovaSenha;
  }

  ngOnInit() {
    this.pegarDadosDoUsuario();
  }

  pegarDadosDoUsuario() {
    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    this.usuarioService.getUsuarioPorId(idUsuario).subscribe({
      next: (response) => {
        this.dadosUsuario = response;

        this.formDadosUsuario.patchValue({
          nome: response.nome,
          email: response.email,
          cpf: response.cpf
        });

        this.cdr.detectChanges();

        console.log('Dados do usuários carregados: ', this.dadosUsuario);
      },
      error: (error) => {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    })
  }

  atualizarDadosDoUsuario() {
    this.submittedAtualizarDados = true;

    if (this.formDadosUsuario.invalid) {
      this.formDadosUsuario.markAllAsTouched();
      return;
    }

    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    const usuarioUpdate: UsuarioUpdateDTO = this.formDadosUsuario.value;
    usuarioUpdate.cpf = usuarioUpdate.cpf.replace(/\D/g, '');
    usuarioUpdate.status = "ATIVO";

    this.mensagemSucessoAtualizarDados = null;
    this.mensagemErroAtualizarDados = null;

    this.usuarioService.atualizarDadosUsuario(idUsuario, usuarioUpdate).subscribe({
      next: (response) => {
        this.dadosUsuario = response;

        this.formDadosUsuario.patchValue({
          nome: response.nome,
          email: response.email,
          cpf: response.cpf
        });

        this.mensagemSucessoAtualizarDados = "Dados atualizados com sucesso!";

        this.cdr.detectChanges();

        console.log('Dados do usuários atualizados: ', response);
      },
      error: (error) => {
        console.error('Erro ao atualizar os dados do usuário:', error);
        this.mensagemErroAtualizarDados = "Erro ao atualizar os dados do usuário.";
        this.cdr.detectChanges();
      }
    })
  }

  atualizarSenhaDoUsuario() {
    this.submittedAtualizarSenha = true;

    if (this.formSenha.invalid) {
      this.formSenha.markAllAsTouched();
      return;
    }

    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    const responseForm = this.formSenha.value;
    const senhaDto: AtualizarSenhaDTO = {
      senha_atual: responseForm.senhaAtual,
      nova_senha: responseForm.novaSenha
    }
    
    this.mensagemSucessoAtualizarSenha = null;
    this.mensagemErroAtualizarSenha = null;

    this.usuarioService.atualizarSenha(idUsuario, senhaDto).subscribe({
      next: (response) => {
        this.formSenha.patchValue({
          senhaAtual: '',
          novaSenha: '',
          confirmarSenha: ''
        });

        this.submittedAtualizarSenha = false;

        this.mensagemSucessoAtualizarSenha = "Senha atualizada com sucesso!";

        this.cdr.detectChanges();

        console.log('Senha do usuários atualizada: ', response);
      },
      error: (error) => {
        console.error('Erro ao atualizar a senha do usuário:', error);

        this.mensagemErroAtualizarSenha = error?.error?.message || "Erro ao atualizar senha.";

        this.cdr.detectChanges();
      }
    })
  }

  abrirModalDeletarConta() {
    this.modalDeletarConta = true;
  }

  fecharModalDeletarConta() {
    this.modalDeletarConta = false;
  }

  deletarConta() {
    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    this.usuarioService.deletarUsuario(idUsuario).subscribe({
      next: (response) => {
        console.log('Conta deletada com sucesso: ', response);
        this.mensagemSucessoDeletarConta = "Conta deletada com sucesso!";
        this.cdr.detectChanges();

        setTimeout(() => {
          this.authService.logout();
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao deletar conta do usuário:', error);
        this.mensagemErroDeletarConta = "Erro ao deletar conta.";
        this.cdr.detectChanges();
      }
    })
  }
}
