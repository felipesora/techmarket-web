import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Pedidos } from '../pedidos/pedidos';
import { PedidoResponse } from '../../../types/pedido';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-listar-pedidos',
  imports: [CarregamentoComponent, RouterLink, DatePipe, CurrencyPipe, NgClass],
  templateUrl: './listar-pedidos.html',
  styleUrl: './listar-pedidos.css',
})
export class ListarPedidos implements OnInit{

  carregando: boolean = false;
  listaPedidos: PedidoResponse[] = [];
  tipo: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pegarAtributosDoParam();
  }

  pegarAtributosDoParam() {
    this.route.queryParamMap.subscribe(params => {
      this.carregando = true;
      const tipoParam = params.get('tipo');

      switch (tipoParam) {
          case 'todos':
            this.tipo = "todos";
            this.listarTodosPedidos();
            break;

          case 'hoje':
            this.tipo = "hoje";
            this.listarPedidosDeHoje();
            break;

          default:
            this.listarTodosPedidos();
            break;
      }
    });
  };

  listarPedidosDeHoje() {
      this.pedidoService.getPedidosDeHoje(0, 100)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.listaPedidos = response.content;
          this.cdr.detectChanges();
          console.log('Pedidos de hoje: ', this.listaPedidos);
        },
        error: (error) => {
          console.error('Erro ao carregar pedidos de hoje:', error);
        }
      });
  };

  listarTodosPedidos() {
      this.pedidoService.getTodosPedidos(0, 100)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.listaPedidos = response.content;
          this.cdr.detectChanges();
          console.log('Pedidos: ', this.listaPedidos);
        },
        error: (error) => {
          console.error('Erro ao carregar pedidos:', error);
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
}
