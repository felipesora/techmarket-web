import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto/produto.service';
import { Produto } from '../../../types/produto';
import { CardProduto } from '../../../components/card-produto/card-produto';
import { AuthService } from '../../../services/auth/auth.service';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";

@Component({
  selector: 'app-produtos-favoritos',
  imports: [CardProduto, CarregamentoComponent],
  templateUrl: './produtos-favoritos.html',
  styleUrl: './produtos-favoritos.css',
})
export class ProdutosFavoritos implements OnInit {

  produtosFavoritados: Produto[] = [];
  carregando: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.listarProdutosFavoritados();
  }

  listarProdutosFavoritados() {
    const idsProdutosFavoritados: string[] = JSON.parse(localStorage.getItem('produtos-favoritos') || '[]');

    if (idsProdutosFavoritados.length === 0) {
      this.produtosFavoritados = [];
      return;
    }

    this.carregando = true;

    this.produtoService.getProdutosPorIds(idsProdutosFavoritados).subscribe({
      next: (response) => {
        this.produtosFavoritados = response;
        this.carregando = false;
        this.cdr.detectChanges();
        console.log('Produtos favoritados: ', this.produtosFavoritados);
      },
      error: (error) => {
        this.carregando = false;
        this.cdr.detectChanges();
        console.error('Erro ao carregar produtos favoritados:', error);
      }
    })
  }
}
