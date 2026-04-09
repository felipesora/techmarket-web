import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PedidoResponse } from '../../types/pedido';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-pedido',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './card-pedido.html',
  styleUrl: './card-pedido.css',
})
export class CardPedido {

  @Input() pedido!: PedidoResponse;
  @Output() cancelarPedidoClick = new EventEmitter<number>();

  itensVisiveis = false;

  toggleItens() {
    this.itensVisiveis = !this.itensVisiveis;
  }

  cancelarPedido() {
    this.cancelarPedidoClick.emit(this.pedido.id_pedido)
  }
}
