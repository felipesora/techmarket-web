import { CarrinhoItem } from "./carrinho"

export interface PedidoRequest {
    id_usuario: number
    metodo_pagamento: string
    itens: CarrinhoItem[]
}

export interface PedidoResponse {
    id_pedido: number
    id_usuario: number
    valor_total: number
    data_criacao: string
    metodo_pagamento: string
    status_pedido: string
    itens: ItemPedido[]
}

export interface ItemPedido {
    id_item_pedido: number
    quantidade: number
    subtotal: number
    produto: ProdutoPedido
}

export interface ProdutoPedido {
    id_produto: number
    id_mongo_produto: string
    codigo: string
    nome: string
}