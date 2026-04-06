import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioResponse, UsuarioUpdateDTO } from '../../types/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { cpfValidator, emailValidator, nomeValidator } from './validatorsDados';

@Component({
  selector: 'app-meus-dados',
  imports: [NgxMaskDirective, RouterLink, ReactiveFormsModule],
  templateUrl: './meus-dados.html',
  styleUrl: './meus-dados.css',
})
export class MeusDados implements OnInit {

  dadosUsuario: UsuarioResponse | null = null;
  mostrarSenha = false;

  formDadosUsuario!: FormGroup;
  formSenha!: FormGroup;

  submittedAtualizarDados = false;
  mensagemSucessoAtualizarDados: string | null = null;
  mensagemErroAtualizarDados: string | null = null;

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
      this.formDadosUsuario = this.fb.group({
        nome: ['', nomeValidator()],
        email: ['', emailValidator()],
        cpf: ['', cpfValidator()],
      }); 
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  ngOnInit() {

    this.formSenha = this.fb.group({
      senhaAtual: [''],
      novaSenha: [''],
      confirmarSenha: ['']
    });

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
    usuarioUpdate.status = "ATIVO"
    usuarioUpdate.id_perfil = this.dadosUsuario?.tipo_perfil === "ADMINISTRADOR"? 1 : 2;

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
}
