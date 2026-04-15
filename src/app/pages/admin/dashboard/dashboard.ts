import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ProdutoService } from '../../../services/produto/produto.service';
import { PedidoService } from '../../../services/pedido/pedido.service';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dataAtual: Date = new Date();
  totalProdutos: number = 0;
  pedidosHoje: number = 0;
  totalUsuarios: number = 0;

  pedidosRecentes = [];
  produtosDestaque = [];

  constructor(
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    
  }


}
