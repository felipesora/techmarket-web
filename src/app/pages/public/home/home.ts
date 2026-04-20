import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardProduto } from '../../../components/card-produto/card-produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Produto } from '../../../types/produto';
import { RouterLink } from '@angular/router';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardProduto, RouterLink, CarregamentoComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  produtosMaisVendidos: Produto[] = [];
  produtosEmPromocao: Produto[] = [];
  carregando: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.carregando = true;

    forkJoin({
      maisVendidos: this.produtoService.getProdutosMaisVendidos(0, 5),
      promocoes: this.produtoService.getProdutosEmPromocao(0, 5)
    })
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.produtosMaisVendidos = response.maisVendidos.content;
        this.produtosEmPromocao = response.promocoes.content;
        this.cdr.detectChanges();

        console.log('Mais vendidos:', this.produtosMaisVendidos);
        console.log('Promoções:', this.produtosEmPromocao);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    })
  }
}
