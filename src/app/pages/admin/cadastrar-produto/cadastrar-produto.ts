import { Component } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [CarregamentoComponent, RouterLink],
  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.css',
})
export class CadastrarProduto {
  carregando: boolean = false;  
}
