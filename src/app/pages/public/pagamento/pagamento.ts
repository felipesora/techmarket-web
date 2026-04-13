import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoResponse } from '../../../types/pedido';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PagamentoService } from '../../../services/pagamento/pagamento.service';

@Component({
  selector: 'app-pagamento',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento implements OnInit {

  idPedido: number | null = null;
  pedido: PedidoResponse | null = null;
  modalPagamentoSucesso = false;

  constructor(
    private pagamentoService: PagamentoService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.obterDadosPedido();
  }

  obterDadosPedido() {
    this.idPedido = Number(this.route.snapshot.paramMap.get('idPedido'));

    this.getPedido(this.idPedido);
  }

  getPedido(idPedido: number | null) {
    if (idPedido == null) {
      return;
    }

    this.pedidoService.getPedidoPorId(idPedido).subscribe({
      next: (response) => {
        this.pedido = response;
        this.cdr.detectChanges();
        console.log('Pedido: ', this.pedido);
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do pedido:', error);
      }
    })
  }

  formatarMetodoPagamento(metodo: string | undefined): string {
    if (!metodo) return '';

    const metodos: Record<string, string> = {
      PIX: 'PIX',
      CARTAO_CREDITO: 'Cartão de Crédito',
      BOLETO: 'Boleto Bancário'
    };

    return metodos[metodo] || metodo;
  }

  confirmarPagamento(idPedido: number | null) {
    if (idPedido == null) return;

    this.pagamentoService.confirmarPagamento(idPedido).subscribe({
      next: (response) => {
        console.log('Pagamento aprovado: ', response);
        this.modalPagamentoSucesso = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log("Erro ao aprovar o pagamento: ", err);
      }
    })
  }

  efetuarPagamento() {
    this.confirmarPagamento(this.idPedido);
  }

  finalizarPedido() {
    this.modalPagamentoSucesso = false;
    this.cdr.detectChanges();
    this.router.navigate(['/']);
  }
}
