import { Component, Input } from '@angular/core';
import { Produto } from '../../types/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {

  @Input() produto!: Produto;
}
