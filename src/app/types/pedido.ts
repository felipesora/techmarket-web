import { CarrinhoItem } from "./carrinho"

export interface PedidoRequest {
    id_usuario: number
    metodo_pagamento: string
    itens: CarrinhoItem[]
}

export interface PedidoResponse {
    
}