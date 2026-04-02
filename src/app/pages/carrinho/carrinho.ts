import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardProdutoCarrinho } from "../../components/card-produto-carrinho/card-produto-carrinho";
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { CarrinhoItem, ProdutoCarrinho } from '../../types/carrinho';
import { ProdutoService } from '../../services/produto/produto.service';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink, CardProdutoCarrinho],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  
  listaCarrinho: CarrinhoItem[] = [];
  listaProdutosDoCarrinho: ProdutoCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService, private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

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

  aumentarQuantidade(id: string) {
    this.carrinhoService.aumentarQuantidadeDoProduto(id);
    this.pegarItensDoCarrinho();
  }

  diminuirQuantidade(id: string) {
    this.carrinhoService.diminuirQuantidadeDoProduto(id);
    this.pegarItensDoCarrinho();
  }

  removerProduto(id: string) {
    this.carrinhoService.removerProdutoDoCarrinho(id);
    this.pegarItensDoCarrinho();
  }

  get precoTotalCarrinho(): number {
    return this.listaProdutosDoCarrinho.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }
}
