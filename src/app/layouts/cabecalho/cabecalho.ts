import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { CarrinhoService } from '../../services/carrinho/carrinho.service';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho implements OnInit {

  busca: string = '';
  quantidadeCarrinho: number = 0;

  constructor(private router: Router, private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    this.carrinhoService.quantidadeItens$
      .subscribe(qtd => {
        this.quantidadeCarrinho = qtd;
      });
  }

  pesquisar() {
    const termo = this.busca.trim();

    if (!termo) return;
    
    this.router.navigate(['/produtos'], {
      queryParams: { busca: termo }
    });

    this.busca = '';
  }
}
