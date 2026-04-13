import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardPedido } from "../../../components/card-pedido/card-pedido";
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { PedidoResponse } from '../../../types/pedido';

@Component({
  selector: 'app-meus-pedidos',
  imports: [CardPedido, RouterLink],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {

  pedidosUsuario: PedidoResponse[] = [];
  modalConfirmarCancelamento: boolean = false;
  idPedidoSelecionado!: number;

  mensagemSucessoCancelarPedido: string | null = null;
  mensagemErroCancelarPedido: string | null = null;

  constructor(private pedidoService: PedidoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pegarPedidosDoUsuario();
  }

  pegarPedidosDoUsuario() {
    const idUsuario = Number(localStorage.getItem('idUsuarioLogado'));

    this.pedidoService.getPedidosPorIdUsuario(idUsuario).subscribe({
      next: (response) => {
        this.pedidosUsuario = response.content;
        this.cdr.detectChanges();

        console.log('Pedidos do usuários carregados: ', this.pedidosUsuario);
      },
      error: (error) => {
        console.error('Erro ao carregar os pedidos do usuário:', error);
      }
    })
  }

  abrirModalConfirmarCancelamento(idPedido: number) {
    this.idPedidoSelecionado = idPedido
    this.modalConfirmarCancelamento = true;
  }

  fecharModalConfirmarCancelamento() {
    this.modalConfirmarCancelamento = false;
  }

  cancelarPedido() {
    this.pedidoService.cancelarPedido(this.idPedidoSelecionado).subscribe({
      next: (response) => {
        console.log('Pedido do usuário cancelado: ', this.pedidosUsuario);
        this.mensagemSucessoCancelarPedido = "Pedido cancelado com sucesso!"
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.modalConfirmarCancelamento = false;
          this.pegarPedidosDoUsuario();
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao cancelar o pedido do usuário:', error);
        this.mensagemErroCancelarPedido = "Erro ao cancelar o pedido."
      }
    })
  }
}
