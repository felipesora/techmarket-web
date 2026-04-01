import { Component, Input } from '@angular/core';
import { Produto } from '../../types/produto';
import { CurrencyPipe } from '@angular/common';
import { FavoritosService } from '../../services/favoritos/favoritos.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-produto',
  imports: [CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {

  constructor(private favoritosService: FavoritosService) {}

  @Input() produto!: Produto;

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

  toggleFavorito() {
    this.favoritosService.toggleFavorito(this.produto.id);
  }

  get estaFavoritado(): boolean {
    return this.favoritosService.isFavorito(this.produto.id);
  }
}
