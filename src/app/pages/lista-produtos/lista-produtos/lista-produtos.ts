import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../services/produto/produto.service';
import { Produto } from '../../../types/produto';
import { CardProduto } from "../../../components/card-produto/card-produto";

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos implements OnInit {

  listaProdutos: Produto[] = [];
  categoria: string | null = null;
  ordenarPor: string = 'preco_asc';

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pegarCategoriaDoParam();
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

  pegarCategoriaDoParam() {
    this.route.queryParamMap.subscribe(params => {
      const categoriaParam = params.get('categoria');
      this.categoria = categoriaParam ? categoriaParam.toUpperCase() : null;

      this.listarProdutosPelaCategoria(this.categoria);
    });
  }

  alterarOrdenacao(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.ordenarPor = select.value;

    this.listarProdutosPelaCategoria(this.categoria);
  }
}
