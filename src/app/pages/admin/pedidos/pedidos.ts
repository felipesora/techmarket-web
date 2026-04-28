import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Router, RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { PedidoResponse } from '../../../types/pedido';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-pedidos',
  imports: [CarregamentoComponent, RouterLink, DatePipe, CurrencyPipe, NgClass],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  carregando: boolean = false;
  pedidosDeHoje: PedidoResponse[] = [];
  todosPedidos: PedidoResponse[] = [];
  usuariosMap = new Map<number, string>();

  menuAbertoId: number | null = null;
  menuPosicao = { top: 0, left: 0 };

  constructor(
    private pedidoService: PedidoService,
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
  }

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.carregando = true;
  
    forkJoin({
      pedidosHoje: this.pedidoService.getPedidosDeHoje(0, 5),
      todosPedidos: this.pedidoService.getTodosPedidos(0, 5)
    })
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.pedidosDeHoje = response.pedidosHoje.content;
        this.todosPedidos = response.todosPedidos.content;
        console.log('Pedidos de Hoje:', this.pedidosDeHoje);
        console.log('Todos os Pedidos:', this.todosPedidos);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    })
  };

  formatarStatusPedido(status: string) {
    switch (status) {
      case 'PAGAMENTO_APROVADO':
        return 'Pagamento Aprovado';

      case 'AGUARDANDO_PAGAMENTO':
        return 'Aguardando Pagamento';

      case 'CANCELADO':
        return 'Cancelado';

      default:
        return status;
    }
  };

  formatarMetodoPagamento(metodo: string) {
    switch (metodo) {
      case 'PIX':
        return 'Pix';

      case 'CARTAO_CREDITO':
        return 'Cartão de Crédito';

      case 'BOLETO':
        return 'Boleto';

      default:
        return metodo;
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

  verDetalhesPedido(id: number) {
    this.router.navigate(['/admin/detalhes-pedido', id]);
  }
}