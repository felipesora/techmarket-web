import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmar-pedido',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './confirmar-pedido.html',
  styleUrl: './confirmar-pedido.css',
})
export class ConfirmarPedido {}
