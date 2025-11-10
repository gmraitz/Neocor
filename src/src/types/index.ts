export interface Recebimento {
  id: string;
  guia: string;
  conta: string;
  codigo: string;
  beneficiario: string;
  dataAtendimento: string;
  codigoProcedimento: string;
  nomeProcedimento: string;
  funcao: string;
  quantidade: number;
  custo: number;
  filme: number;
  honorario: number;
  glosa: number;
  codGlosa: string;
  total: number;
  executante: string;
  localAtendimento: string;
  prestadorArquivo: string;
  status: 'recebido' | 'pendente' | 'atrasado';
  formaPagamento?: string;
  instituicao?: string;
}

export interface FiltrosDashboard {
  periodo: string;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  instituicao?: string;
  formaPagamento?: string;
  executante?: string;
  localAtendimento?: string;
  nomeProcedimento?: string;
  conta?: string;
}

export interface FiltrosRecebimentos {
  searchTerm: string;
  status: string;
  periodo: string;
  dataInicio?: string;
  dataFim?: string;
  instituicao?: string;
  formaPagamento?: string;
  beneficiario?: string;
  executante?: string;
  localAtendimento?: string;
  prestadorArquivo?: string;
  codigoProcedimento?: string;
}

export interface MetricaCard {
  titulo: string;
  valor: string;
  mudanca?: string;
  icone: React.ReactNode;
  tipo?: 'positivo' | 'negativo' | 'neutro';
}
