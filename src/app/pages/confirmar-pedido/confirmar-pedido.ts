import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoItem, ProdutoCarrinho } from '../../types/carrinho';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { ProdutoService } from '../../services/produto/produto.service';
import { FormsModule } from '@angular/forms';
import { PedidoRequest } from '../../types/pedido';
import { PedidoService } from '../../services/pedido/pedido.service';

@Component({
  selector: 'app-confirmar-pedido',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './confirmar-pedido.html',
  styleUrl: './confirmar-pedido.css',
})
export class ConfirmarPedido implements OnInit {

  listaCarrinho: CarrinhoItem[] = [];
  listaProdutosDoCarrinho: ProdutoCarrinho[] = [];
  formaPagamento: string = '';

  constructor(private pedidoService: PedidoService, private carrinhoService: CarrinhoService, private produtoService: ProdutoService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pegarItensDoCarrinho();
  }

  pegarItensDoCarrinho() {
    this.listaCarrinho = this.carrinhoService.listarCarrinho();
    console.log(this.listaCarrinho);

    const ids = this.listaCarrinho.map(item => item.id_mongo);

    this.produtoService.getProdutosPorIds(ids).subscribe({
      next: (response) => {
        this.listaProdutosDoCarrinho = response.map(produto => {
          
          const itemCarrinho = this.listaCarrinho.find(
            item => item.id_mongo === produto.id
          );

          return {
            produto: produto,
            quantidade: itemCarrinho?.quantidade ?? 1
          };

        });
        this.cdr.detectChanges();
        console.log('Produtos do carrinho: ', this.listaProdutosDoCarrinho);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos do carrinho:', error);
      }
    })
  }

  get precoTotalCarrinho(): number {
    return this.listaProdutosDoCarrinho.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  gerarPedido() {
    const idUsuario: number = Number(localStorage.getItem("idUsuarioLogado"));

    const pedido: PedidoRequest = {
      id_usuario: idUsuario,
      metodo_pagamento: this.formaPagamento,
      itens: this.listaCarrinho
    }

    this.cadastrarPedido(pedido);
  }

  cadastrarPedido(pedido: PedidoRequest) {
    this.pedidoService.criarPedido(pedido).subscribe({
      next: (response) => {
        console.log('Pedido Criado: ', response);

        this.carrinhoService.limparCarrinho();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.log("Erro ao criar o pedido: ", err);
      }
    })
  }
}
