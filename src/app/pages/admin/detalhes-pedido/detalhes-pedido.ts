import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { PedidoResponse } from '../../../types/pedido';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { UsuarioResponse } from '../../../types/usuario';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-detalhes-pedido',
  imports: [CarregamentoComponent, RouterLink, NgClass, DatePipe, CurrencyPipe],
  templateUrl: './detalhes-pedido.html',
  styleUrl: './detalhes-pedido.css',
})
export class DetalhesPedido implements OnInit {
  carregando: boolean = false;

  idPedido: number | null = null;
  pedido: PedidoResponse = {} as PedidoResponse;
  usuario: UsuarioResponse = {} as UsuarioResponse;

  modalCancelarPedido: boolean = false;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.idPedido = Number(this.route.snapshot.paramMap.get('id'));

    this.buscarDetalhesPedido(this.idPedido);
  }

  buscarDetalhesPedido(idPedido: number) {
    if (idPedido == null) {
      return;
    }

    this.carregando = true;

    this.pedidoService.getPedidoPorId(idPedido).subscribe({
      next: (response) => {
        this.pedido = response;
        this.carregando = false;
        this.cdr.detectChanges();

        this.buscarDetalhesUsuario(this.pedido.id_usuario);
        console.log('Pedido: ', this.pedido);
      },
      error: (error) => {
        this.carregando = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar detalhes do pedido:', error);
      }
    })
  };

  buscarDetalhesUsuario(idUsuario: number) {
    if (idUsuario == null) {
      return;
    }

    this.carregando = true;

    this.usuarioService.getUsuarioPorId(idUsuario).subscribe({
      next: (response) => {
        this.usuario = response;
        this.carregando = false;
        this.cdr.detectChanges();
        console.log('Usuario: ', this.usuario);
      },
      error: (error) => {
        this.carregando = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar detalhes do usuario:', error);
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

  abrirModalCancelarPedido() {
    this.modalCancelarPedido = true;
    this.cdr.detectChanges();
  };

  fecharModalCancelarPedido() {
    this.modalCancelarPedido = false;
    this.cdr.detectChanges();
  }

  cancelarPedido(idPedido: number) {
    this.mensagemSucesso = null;
    this.mensagemErro = null;

    this.pedidoService.cancelarPedido(idPedido).subscribe({
      next: (response) => {
        console.log('Produto cancelado com sucesso: ', response);
        this.mensagemSucesso = "Pedido cancelado com sucesso!";

        this.buscarDetalhesPedido(idPedido);

        this.cdr.detectChanges();

        setTimeout(() => {
          this.fecharModalCancelarPedido();
          this.mensagemSucesso = null;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao cancelar pedido:', error);
        this.mensagemErro = "Erro ao cancelar pedido.";
        this.cdr.detectChanges();
      }
    })
  };
}
