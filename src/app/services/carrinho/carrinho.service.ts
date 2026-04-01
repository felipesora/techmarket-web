import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../../types/carrinho';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private chaveLocalStorage = 'carrinho';

  private quantidadeItensSubject = new BehaviorSubject<number>(this.getQuantidadeItens());
  quantidadeItens$ = this.quantidadeItensSubject.asObservable();

  private getCarrinho(): CarrinhoItem[] {
    const data = localStorage.getItem(this.chaveLocalStorage);
    return data ? JSON.parse(data) : [];
  }

  private salvarCarrinho(itens: CarrinhoItem[]) {
    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(itens));

    this.quantidadeItensSubject.next(this.getQuantidadeItens());
  }

  adicionarProduto(id: string) {
    const carrinho = this.getCarrinho();

    const itemExistente = carrinho.find(p => p.id_mongo === id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({
        id_mongo: id,
        quantidade: 1
      });
    }

    this.salvarCarrinho(carrinho);
  }

  listarCarrinho(): CarrinhoItem[] {
    return this.getCarrinho();
  }

  getQuantidadeItens(): number {
    const carrinho = this.getCarrinho();
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  }
}
