import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../../types/produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { CardProduto } from '../../../components/card-produto/card-produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos implements OnInit {

  listaProdutos: Produto[] = [];
  categoria: string | null = null;
  busca: string | null = null;
  ordenarPor: string = 'preco_asc';

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pegarAtributosDoParam();
  }

  listarProdutosPelaCategoria(categoria: string | null) {
    if (categoria == null) {
      this.listaProdutos = [];
      return;
    }

    this.produtoService.getProdutosPorCategoria(categoria, this.ordenarPor).subscribe({
      next: (response) => {
        this.listaProdutos = response;
        this.cdr.detectChanges();
        console.log('Produtos encontrados: ', this.listaProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    })
  }

  buscarProdutos(busca: string | null) {
    if (busca == null) {
      this.listaProdutos = [];
      return;
    }

    this.produtoService.getProdutosPorBusca(busca, this.ordenarPor).subscribe({
      next: (response) => {
        this.listaProdutos = response;
        this.cdr.detectChanges();
        console.log('Produtos encontrados: ', this.listaProdutos);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    })
  }

  pegarAtributosDoParam() {
    this.route.queryParamMap.subscribe(params => {
      const categoriaParam = params.get('categoria');
      const buscaParam = params.get('busca');

      if (categoriaParam) {
        this.categoria = categoriaParam ? categoriaParam.toUpperCase() : null;
        this.listarProdutosPelaCategoria(this.categoria);
      }

      else if (buscaParam) {
        this.busca = buscaParam;
        this.buscarProdutos(buscaParam);
      }

    });
  }

  alterarOrdenacao(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.ordenarPor = select.value;

    const categoriaParam = this.route.snapshot.queryParamMap.get('categoria');
    const buscaParam = this.route.snapshot.queryParamMap.get('busca');

    if (categoriaParam) {
      this.listarProdutosPelaCategoria(categoriaParam);
    }

    else if (buscaParam) {
      this.buscarProdutos(buscaParam);
    }
  }
}
