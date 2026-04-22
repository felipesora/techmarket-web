import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Produto } from '../../../types/produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-listar-produtos',
  imports: [CarregamentoComponent, DatePipe, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './listar-produtos.html',
  styleUrl: './listar-produtos.css',
})
export class ListarProdutos implements OnInit {

  carregando: boolean = false;
  listaProdutos: Produto[] = [];
  tipo: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService, 
    private cdr: ChangeDetectorRef,
  private router: Router) {}

  ngOnInit() {
    this.pegarAtributosDoParam();
  }

  pegarAtributosDoParam() {
    this.route.queryParamMap.subscribe(params => {
      this.carregando = true;
      const tipoParam = params.get('tipo');

      switch (tipoParam) {
          case 'destaque':
            this.tipo = "destaque";
            this.listarProdutosMaisVendidos();
            break;

          case 'promocao':
            this.tipo = "promocao";
            this.listarProdutosEmPromocao();
            break;

          default:
            this.listarTodosProdutos();
            break;
      }
    });
  }

  listarProdutosMaisVendidos() {
    this.produtoService.getProdutosMaisVendidos(0, 30)
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.listaProdutos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos mais vendidos: ', this.listaProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos mais vendidos:', error);
      }
    });
  };

  listarProdutosEmPromocao() {
    this.produtoService.getProdutosEmPromocao(0, 30)
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.listaProdutos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos em promoção: ', this.listaProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos em promoção:', error);
      }
    });
  };

  listarTodosProdutos() {
    this.produtoService.getTodosProdutos(0, 30)
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.listaProdutos = response.content;
        this.cdr.detectChanges();
        console.log('Produtos mais vendidos: ', this.listaProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos mais vendidos:', error);
      }
    });
  };

  calcularDesconto(precoUnitario: number, precoPromocional: number) {
    if (precoUnitario <= 0) return 0;

    const desconto = ((precoUnitario - precoPromocional) / precoUnitario) * 100;

    return Math.max(0, Math.round(desconto));
  };

  editarProduto(id: string) {
    this.router.navigate(['/admin/produtos/editar', id]);
  };
}
