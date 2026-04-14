import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dataAtual: Date = new Date();

  totalProdutos = 0;
  pedidosHoje = 0;
  totalUsuarios = 0;

  pedidosRecentes = [];
  produtosDestaque = [];
}
