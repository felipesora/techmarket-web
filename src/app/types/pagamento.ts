export interface PagamentoResponse {
    id_pagamento: number
    id_pedido: number
    valor_total: number
    metodo_pagamento: string
    status_pagamento: string
    data_criacao: string
}