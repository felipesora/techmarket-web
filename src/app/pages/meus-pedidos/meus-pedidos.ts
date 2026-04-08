import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardPedido } from "../../components/card-pedido/card-pedido";
import { RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedido/pedido.service';
import { PedidoResponse } from '../../types/pedido';

@Component({
  selector: 'app-meus-pedidos',
  imports: [CardPedido, RouterLink],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {

  pedidosUsuario: PedidoResponse[] = [];

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
}
