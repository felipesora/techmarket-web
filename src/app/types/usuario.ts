export interface UsuarioCadastro {
    nome: string
    email: string
    cpf: string
    senha: string
    perfil: string
}

export interface LoginRequest {
    email: string
    senha: string
}

export interface LoginResponse {
  token: string;
}

export interface UsuarioPageResponse {
  content: UsuarioResponse[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface UsuarioResponse {
    id_usuario: number
    nome: string
    email: string
    cpf: string
    status: string
    perfil: string
}

export interface UsuarioUpdateDTO {
    nome: string
    email: string
    cpf: string
    status: string
}

export interface AtualizarSenhaDTO {
    senha_atual: string
    nova_senha: string
}

export interface AtualizarStatusDTO {
    status: "ATIVO" | "INATIVO"
}