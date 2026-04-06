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

export interface UsuarioResponse {
    id_usuario: number
    nome: string
    email: string
    cpf: string
    status: string
    tipo_perfil: string
}

export interface UsuarioUpdateDTO {
    nome: string
    email: string
    cpf: string
    status: string
    id_perfil: number
}

export interface AtualizarSenhaDTO {
    senha_atual: string
    nova_senha: string
}