import { Component } from '@angular/core';
import { CardProduto } from '../../components/card-produto/card-produto';

@Component({
  selector: 'app-home',
  imports: [CardProduto],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
