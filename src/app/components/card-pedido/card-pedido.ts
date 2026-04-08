import { Component, Input } from '@angular/core';
import { PedidoResponse } from '../../types/pedido';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-pedido',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './card-pedido.html',
  styleUrl: './card-pedido.css',
})
export class CardPedido {

  @Input() pedido!: PedidoResponse;
  itensVisiveis = false;

  toggleItens() {
    this.itensVisiveis = !this.itensVisiveis;
  }
}
