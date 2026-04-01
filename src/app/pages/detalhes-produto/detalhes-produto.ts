import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto/produto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../../types/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalhes-produto',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.css',
})
export class DetalhesProduto implements OnInit {

  idProduto: string | null = null;
  produto: Produto | null = null;

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

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

    this.produtoService.getProdutoPorId(idProduto).subscribe({
      next: (response) => {
        this.produto = response;
        this.cdr.detectChanges();
        console.log('Produto: ', this.produto);
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do produto:', error);
      }
    })
  }

  get imagemProduto(): string | null {
    switch (this.produto?.categoria) {
      case 'NOTEBOOKS': return 'images/produtos/notebook.png';
      case 'CELULARES': return 'images/produtos/celular.png';
      case 'COMPUTADORES': return 'images/produtos/computador.png';
      case 'MONITORES': return 'images/produtos/monitor.png';
      case 'PERIFERICOS': return 'images/produtos/perifericos.png';
      case 'TECLADOS': return 'images/produtos/teclado.png';
      case 'MOUSES': return 'images/produtos/mouse.png';
      case 'HEADSETS': return 'images/produtos/headset.png';
      case 'WEBCAMS': return 'images/produtos/webcam.png';
      case 'COMPONENTES': return 'images/produtos/componentes.png';
      case 'AUDIO': return 'images/produtos/audio.png';
      case 'FONES': return 'images/produtos/fone.png';
      case 'OUTROS': return null;
      default: return null;
    }
  }
}
