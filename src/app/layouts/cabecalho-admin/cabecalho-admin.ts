import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioResponse } from '../../types/usuario';

@Component({
  selector: 'app-cabecalho-admin',
  imports: [RouterLink],
  templateUrl: './cabecalho-admin.html',
  styleUrl: './cabecalho-admin.css',
})
export class CabecalhoAdmin {

  usuarioLogado: UsuarioResponse | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.pegarUsuarioLogado();
  }

  fazerLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  pegarUsuarioLogado() {
    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    this.usuarioService.getUsuarioPorId(idUsuario).subscribe({
      next: (response) => {
        this.usuarioLogado = response;
        this.cdr.detectChanges();
        console.log('Usuário Admin: ', this.usuarioLogado);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do usuario:', error);
      }
    })
  }

  getIniciaisNome(): string {
    if (!this.usuarioLogado?.nome) return '';

    return this.usuarioLogado.nome
      .trim()
      .substring(0, 2)
      .toUpperCase();
  }
}
