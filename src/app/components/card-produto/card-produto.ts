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

  toggleFavorito() {
    this.favoritosService.toggleFavorito(this.produto.id);
  }

  get estaFavoritado(): boolean {
    return this.favoritosService.isFavorito(this.produto.id);
  }
}
