import { Produto } from "./produto";

export interface CarrinhoItem {
  id_mongo: string;
  quantidade: number;
}

export interface ProdutoCarrinho {
  produto: Produto;
  quantidade: number;
}