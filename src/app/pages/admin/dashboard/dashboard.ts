import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ProdutoService } from '../../../services/produto/produto.service';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { PedidoResponse } from '../../../types/pedido';
import { Produto } from '../../../types/produto';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, CurrencyPipe, NgClass, CarregamentoComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  carregando: boolean = false;

  dataAtual: Date = new Date();
  totalProdutos: number = 0;
  pedidosHoje: number = 0;
  totalUsuarios: number = 0;

  pedidosRecentes: PedidoResponse[] = [];
  produtosMaisVendidos: Produto[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregando = true;

    forkJoin({
      totalProdutos: this.produtoService.getQuantidadeProdutos(),
      pedidosHoje: this.pedidoService.getQuantidadePedidosHoje(),
      totalUsuarios: this.usuarioService.getQuantidadeUsuarios(),
      pedidosRecentes: this.pedidoService.getTodosPedidos(),
      maisVendidos: this.produtoService.getProdutosMaisVendidos()
    })
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (res) => {
        this.totalProdutos = res.totalProdutos;
        this.pedidosHoje = res.pedidosHoje;
        this.totalUsuarios = res.totalUsuarios;
        this.pedidosRecentes = res.pedidosRecentes.content;
        this.produtosMaisVendidos = res.maisVendidos.content;

        console.log('Dashboard carregado');
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard:', err);
      }
    });
  }

  pegarQuantidadeProdutos() {
    this.produtoService.getQuantidadeProdutos().subscribe({
      next: (response) => {
        this.totalProdutos = response;
        this.cdr.detectChanges();
        console.log('Total produtos: ', this.totalProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar quantidade de produtos: ', error);
      }
    })
  };

  pegarQuantidadePedidosHoje() {
    this.pedidoService.getQuantidadePedidosHoje().subscribe({
      next: (response) => {
        this.pedidosHoje = response;
        this.cdr.detectChanges();
        console.log('Total pedidos hoje: ', this.pedidosHoje);
      },
      error: (error) => {
        console.error('Erro ao carregar quantidade de pedidos de hoje: ', error);
      }
    })
  }

  pegarQuantidadeUsuarios() {
    this.usuarioService.getQuantidadeUsuarios().subscribe({
      next: (response) => {
        this.totalUsuarios = response;
        this.cdr.detectChanges();
        console.log('Total usuários: ', this.totalUsuarios);
      },
      error: (error) => {
        console.error('Erro ao carregar quantidade de usuários: ', error);
      }
    })
  };

  pegarPedidosRecentes() {
    this.pedidoService.getTodosPedidos().subscribe({
      next: (response) => {
        this.pedidosRecentes = response.content;
        this.cdr.detectChanges();
        console.log('Pedidos Recentes: ', this.pedidosRecentes);
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos recentes: ', error);
      }
    })
  };

  pegarProdutosMaisVendidos() {
    this.produtoService.getProdutosMaisVendidos().subscribe({
      next: (response) => {
        this.produtosMaisVendidos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos mais vendidos: ', this.produtosMaisVendidos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos mais vendidos:', error);
      }
    });
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
}
