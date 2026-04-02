import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardProdutoCarrinho } from "../../components/card-produto-carrinho/card-produto-carrinho";

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink, CardProdutoCarrinho],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  
  ngOnInit() {
    
  }
}
