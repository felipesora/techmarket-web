import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioResponse } from '../../types/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  ngOnInit() {
    this.formDadosUsuario = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
    });

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
}
