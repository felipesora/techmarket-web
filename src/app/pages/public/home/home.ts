import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardProduto } from '../../../components/card-produto/card-produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Produto } from '../../../types/produto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardProduto],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  produtosMaisVendidos: Produto[] = [];
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.getProdutosMaisVendidos().subscribe({
      next: (response) => {
        this.produtosMaisVendidos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos mais vendidos: ', this.produtosMaisVendidos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos mais vendidos:', error);
      }
    });

    this.produtoService.getTodosProdutos().subscribe({
      next: (response) => {
        this.produtos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos cadastrados: ', this.produtos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }
}
