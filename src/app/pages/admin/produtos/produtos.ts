import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto/produto.service';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Produto } from '../../../types/produto';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-produtos',
  imports: [CarregamentoComponent, DatePipe, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  carregando: boolean = false;
  produtosMaisVendidos: Produto[] = [];
  produtosEmPromocao: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.carregando = true;
  
    forkJoin({
      maisVendidos: this.produtoService.getProdutosMaisVendidosAdmin(0, 5),
      promocoes: this.produtoService.getProdutosEmPromocaoAdmin(0, 5)
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

  calcularDesconto(precoUnitario: number, precoPromocional: number) {
    if (precoUnitario <= 0) return 0;

    const desconto = ((precoUnitario - precoPromocional) / precoUnitario) * 100;

    return Math.max(0, Math.round(desconto));
  }
  
  editarProduto(id: string) {
    this.router.navigate(['/admin/editar-produto', id]);
  }
}
