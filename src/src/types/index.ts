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
  lote?: string;
  lotePres?: string;
  solicitante?: string;
  plano: string;
  dataConta?: string;
  qtdePaga?: number;
  acomodacao?: string;
  horaRealizacao?: string;
  acrescimo?: number;
  percentualVia?: number;
  operadorFat?: string;
  status: 'recebido' | 'pendente' | 'atrasado';
  statusConsolidacao?: 'consolidado' | 'glosado' | 'aberto' | 'pago-parcial';
  valorPagoParcial?: number;
}

export interface FiltrosDashboard {
  periodo: string;
  dataInicio?: string;
  dataFim?: string;
  executante?: string;
  beneficiario?: string;
}

export interface FiltrosRecebimentos {
  searchTerm: string;
  status: string;
  periodo: string;
  dataInicio?: string;
  dataFim?: string;
  plano?: string;
  beneficiario?: string;
  executante?: string;
  localAtendimento?: string;
  prestadorArquivo?: string;
  codigoProcedimento?: string;
  instituicao?: string;
  formaPagamento?: string;
  statusConsolidacao?: string;
  codGlosa?: string;
  tipoPeriodo?: 'dataAtendimento' | 'dataConta';
}

export interface MetricaCard {
  titulo: string;
  valor: string;
  mudanca?: string;
  icone: React.ReactNode;
  tipo?: 'positivo' | 'negativo' | 'neutro';
}