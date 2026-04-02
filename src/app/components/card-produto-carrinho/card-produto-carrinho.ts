import { Component } from '@angular/core';
import { Produto } from '../../types/produto';

@Component({
  selector: 'app-card-produto-carrinho',
  imports: [],
  templateUrl: './card-produto-carrinho.html',
  styleUrl: './card-produto-carrinho.css',
})
export class CardProdutoCarrinho {

  produto: Produto | null = null;

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
