export interface UsuarioCadastro {
    nome: string
    email: string
    cpf: string
    senha: string
    id_perfil: number
}

export interface LoginRequest {
    email: string
    senha: string
}

export interface LoginResponse {
  token: string;
}