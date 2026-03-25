export interface UsuarioCadastro {
    nome: string
    email: string
    cpf: string
    senha: string
    id_perfil: number
}

export interface Login {
    email: string
    senha: string
}