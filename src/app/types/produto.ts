export interface ProdutoPageResponse {
  content: Produto[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface Produto {
  id: string
  codigo: string
  nome: string
  descricao: string
  categoria: string
  marca: string
  precoUnitario: number
  precoPromocional: number
  precoFinal: number
  estoque: number
  status: string
  dataCriacao: string
  imagemId: string | null
  quantidadeVendida: number
}