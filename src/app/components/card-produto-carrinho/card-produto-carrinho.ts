import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../types/produto';
import { CurrencyPipe } from '@angular/common';
import { env } from '../../core/env';

@Component({
  selector: 'app-card-produto-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './card-produto-carrinho.html',
  styleUrl: './card-produto-carrinho.css',
})
export class CardProdutoCarrinho {

  @Input() produto!: Produto;
  @Input() quantidade!: number;

  @Output() aumentar = new EventEmitter<string>();
  @Output() diminuir = new EventEmitter<string>();
  @Output() remover = new EventEmitter<string>();

  getImagemUrl(imagemId: string | null | undefined): string {
    if (!imagemId) return '';

    return `${env.apiUrl}/techmarket-product-service/produtos/imagem/${imagemId}`;
  }
}
