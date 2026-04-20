import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../../types/produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { CardProduto } from '../../../components/card-produto/card-produto';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto, CarregamentoComponent],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos implements OnInit {

  listaProdutos: Produto[] = [];
  categoria: string | null = null;
  busca: string | null = null;
  tipo: string | null = null;
  ordenarPor: string = 'preco_asc';
  carregando: boolean = false;

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pegarAtributosDoParam();
  }

  pegarAtributosDoParam() {
    this.route.queryParamMap.subscribe(params => {
      this.carregando = true;
      const categoriaParam = params.get('categoria');
      const buscaParam = params.get('busca');
      const tipoParam = params.get('tipo');

      if (categoriaParam) {
        this.categoria = categoriaParam ? categoriaParam.toUpperCase() : null;
        this.listarProdutosPelaCategoria(this.categoria);

      } else if (buscaParam) {
        this.busca = buscaParam;
        this.listarProdutosPorBusca(buscaParam);

      } else if (tipoParam) {
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
      }

    });
  };

  listarProdutosPelaCategoria(categoria: string | null) {
    if (categoria == null) {
      this.listaProdutos = [];
      return;
    }

    this.produtoService.getProdutosPorCategoria(categoria, this.ordenarPor)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.listaProdutos = response;
          this.cdr.detectChanges();
          console.log('Produtos encontrados: ', this.listaProdutos);
        },
        error: (error) => {
          console.error('Erro ao carregar produtos:', error);
        }
      })
  };

  listarProdutosPorBusca(busca: string | null) {
    if (busca == null) {
      this.listaProdutos = [];
      return;
    }

    this.produtoService.getProdutosPorBusca(busca, this.ordenarPor)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.listaProdutos = response;
          this.cdr.detectChanges();
          console.log('Produtos encontrados: ', this.listaProdutos);
        },
        error: (error) => {
          console.error('Erro ao carregar produtos:', error);
        }
      })
  };

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

  alterarOrdenacao(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.ordenarPor = select.value;

    const categoriaParam = this.route.snapshot.queryParamMap.get('categoria');
    const buscaParam = this.route.snapshot.queryParamMap.get('busca');

    if (categoriaParam) {
      this.listarProdutosPelaCategoria(categoriaParam);
    }

    else if (buscaParam) {
      this.listarProdutosPorBusca(buscaParam);
    }
  };
}
