export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cargo?: string;
  avatar?: string;
}

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  cargo?: string;
}

export interface DadosLogin {
  email: string;
  senha: string;
}
