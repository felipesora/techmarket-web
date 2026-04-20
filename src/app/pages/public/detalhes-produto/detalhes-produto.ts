import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto/produto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../../../types/produto';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FavoritosService } from '../../../services/favoritos/favoritos.service';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";

@Component({
  selector: 'app-detalhes-produto',
  imports: [CurrencyPipe, RouterLink, NgClass, CarregamentoComponent],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.css',
})
export class DetalhesProduto implements OnInit {

  idProduto: string | null = null;
  produto: Produto | null = null;
  adicionadoNoCarrinho: boolean = false;
  carregando: boolean = false;

  constructor(
    private produtoService: ProdutoService, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef, 
    private favoritosService: FavoritosService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.obterDadosProduto();
  }

  obterDadosProduto() {
    this.idProduto = this.route.snapshot.paramMap.get('id');

    this.getProduto(this.idProduto);
  }

  getProduto(idProduto: string | null) {
    if (idProduto == null) {
      return;
    }

    this.carregando = true;

    this.produtoService.getProdutoPorId(idProduto).subscribe({
      next: (response) => {
        this.produto = response;
        this.carregando = false;
        this.cdr.detectChanges();
        console.log('Produto: ', this.produto);
      },
      error: (error) => {
        this.carregando = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar detalhes do produto:', error);
      }
    })
  }

  toggleFavorito() {
    if (!this.produto) return;

    this.favoritosService.toggleFavorito(this.produto.id);
  }

  get estaFavoritado(): boolean {
    if (!this.produto) return false;
    
    return this.favoritosService.isFavorito(this.produto.id);
  }

  adicionarCarrinho() {
    if (!this.produto) return;
    this.carrinhoService.adicionarProduto(this.produto.id);

    this.adicionadoNoCarrinho = true;

    setTimeout(() => {
      this.adicionadoNoCarrinho = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
