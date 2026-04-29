import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AtualizarStatusDTO, UsuarioResponse } from '../../../types/usuario';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-listar-usuarios',
  imports: [CarregamentoComponent, RouterLink, NgClass],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css',
})
export class ListarUsuarios implements OnInit {

  carregando: boolean = false;
  listaUsuarios: UsuarioResponse[] = [];
  tipo: string | null = null;

  menuAbertoId: number | null = null;
  menuPosicao = { top: 0, left: 0 };

  usuarioSelecionadoId: number | null = null;
  modalExcluirUsuario: boolean = false;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Fecha o menu ao clicar fora
    document.addEventListener('click', () => {
      if (this.menuAbertoId) {
        this.menuAbertoId = null;
        this.cdr.detectChanges();
      }
    });
  };

  ngOnInit(): void {
    this.pegarAtributosDoParam();
  };

  pegarAtributosDoParam() {
    this.route.queryParamMap.subscribe(params => {
      this.carregando = true;
      const tipoParam = params.get('tipo');
      this.tipo = tipoParam;

      this.listarUsuarios();
    });
  };

  listarUsuariosAdmins() {
    this.usuarioService.getUsuariosAdmins(0, 100)
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.listaUsuarios = response.content;
        this.cdr.detectChanges();
        console.log('Administradores: ', this.listaUsuarios);
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  };

  listarUsuariosComuns() {
    this.usuarioService.getUsuariosComuns(0, 100)
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.listaUsuarios = response.content;
        this.cdr.detectChanges();
        console.log('Comuns: ', this.listaUsuarios);
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  };

  listarUsuarios() {
    switch (this.tipo) {
      case 'admin':
        this.tipo = "admin";
        this.listarUsuariosAdmins();
        break;

      case 'comum':
        this.tipo = "comum";
        this.listarUsuariosComuns();
        break;

      default:
        this.listarUsuariosComuns();
        break;
    }
  };

  toggleMenu(id: number, event: MouseEvent) {
    event.stopPropagation();

    if (this.menuAbertoId === id) {
      this.menuAbertoId = null;
      return;
    }

    const botao = event.currentTarget as HTMLElement;
    const rect = botao.getBoundingClientRect();

    this.menuPosicao = {
      top: rect.bottom + 4,
      left: rect.right - 160
    };

    this.menuAbertoId = id;
  };

  fecharMenu(id: number) {
    if (this.menuAbertoId === id) {
      this.menuAbertoId = null;
    }
  };

  abrirModalExcluirUsuario(idUsuario: number) {
    this.usuarioSelecionadoId = idUsuario;
    this.modalExcluirUsuario = true;
    this.cdr.detectChanges();
  };

  fecharModalExcluirUsuario() {
    this.usuarioSelecionadoId = null;
    this.modalExcluirUsuario = false;
    this.cdr.detectChanges();
  };

  formatarCpf(cpf: string): string {
    if (!cpf) return '';

    return cpf
      .replace(/\D/g, '') // remove qualquer coisa que não seja número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  formatarStatus(status: string) {
    switch (status) {
      case 'USUARIO':
        return 'Usuário Comum';

      case 'ADMINISTRADOR':
        return 'Administrador';

      default:
        return status;
    }
  };

  excluirUsuario(idUsuario: number) {
    this.mensagemSucesso = null;
    this.mensagemErro = null;

    this.usuarioService.deletarUsuario(idUsuario).subscribe({
      next: (response) => {
        console.log('Usuário excluído com sucesso: ', response);
        this.mensagemSucesso = "Usuário excluído com sucesso!";

        this.cdr.detectChanges();

        setTimeout(() => {
          this.listarUsuarios();
          this.fecharModalExcluirUsuario();
          this.mensagemSucesso = null;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao excluir usuário:', error);
        this.mensagemErro = "Erro ao excluir usuário.";
        this.cdr.detectChanges();
      }
    })
  };

  atualizarStatus(idUsuario: number, status: AtualizarStatusDTO) {
    this.usuarioService.atualizarStatus(idUsuario, status).subscribe({
      next: () => {
        console.log('Status atualizado');
        this.listarUsuarios();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao atualizar o status do usuário:', error);
      }
    })
  };
}
