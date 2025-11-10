import { Recebimento, FiltrosRecebimentos, FiltrosDashboard } from '../types';

export const aplicarFiltrosRecebimentos = (
  recebimentos: Recebimento[],
  filtros: FiltrosRecebimentos
): Recebimento[] => {
  return recebimentos.filter((rec) => {
    // Filtro de busca textual
    const matchesSearch =
      !filtros.searchTerm ||
      rec.beneficiario.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      rec.guia.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      rec.nomeProcedimento.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      rec.executante.toLowerCase().includes(filtros.searchTerm.toLowerCase()) ||
      rec.codigo.toLowerCase().includes(filtros.searchTerm.toLowerCase());

    // Filtro de status
    const matchesStatus = filtros.status === 'todos' || rec.status === filtros.status;

    // Filtro de instituição
    const matchesInstituicao =
      !filtros.instituicao ||
      filtros.instituicao === 'todos' ||
      rec.instituicao === filtros.instituicao;

    // Filtro de forma de pagamento
    const matchesFormaPagamento =
      !filtros.formaPagamento ||
      filtros.formaPagamento === 'todos' ||
      rec.formaPagamento === filtros.formaPagamento;

    // Filtro de beneficiário
    const matchesBeneficiario =
      !filtros.beneficiario ||
      filtros.beneficiario === 'todos' ||
      rec.beneficiario.toLowerCase().includes(filtros.beneficiario.toLowerCase());

    // Filtro de executante
    const matchesExecutante =
      !filtros.executante ||
      filtros.executante === 'todos' ||
      rec.executante.toLowerCase().includes(filtros.executante.toLowerCase());

    // Filtro de local de atendimento
    const matchesLocalAtendimento =
      !filtros.localAtendimento ||
      filtros.localAtendimento === 'todos' ||
      rec.localAtendimento === filtros.localAtendimento;

    // Filtro de prestador arquivo
    const matchesPrestadorArquivo =
      !filtros.prestadorArquivo ||
      filtros.prestadorArquivo === 'todos' ||
      rec.prestadorArquivo === filtros.prestadorArquivo;

    // Filtro de código de procedimento
    const matchesCodigoProcedimento =
      !filtros.codigoProcedimento ||
      filtros.codigoProcedimento === 'todos' ||
      rec.codigoProcedimento === filtros.codigoProcedimento;

    // Filtro de período
    const matchesPeriodo = aplicarFiltroPeriodo(rec.dataAtendimento, filtros.periodo, filtros.dataInicio, filtros.dataFim);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesInstituicao &&
      matchesFormaPagamento &&
      matchesBeneficiario &&
      matchesExecutante &&
      matchesLocalAtendimento &&
      matchesPrestadorArquivo &&
      matchesCodigoProcedimento &&
      matchesPeriodo
    );
  });
};

export const aplicarFiltrosDashboard = (
  recebimentos: Recebimento[],
  filtros: FiltrosDashboard
): Recebimento[] => {
  return recebimentos.filter((rec) => {
    // Filtro de status
    const matchesStatus = !filtros.status || filtros.status === 'todos' || rec.status === filtros.status;

    // Filtro de instituição
    const matchesInstituicao =
      !filtros.instituicao ||
      filtros.instituicao === 'todos' ||
      rec.instituicao === filtros.instituicao;

    // Filtro de forma de pagamento
    const matchesFormaPagamento =
      !filtros.formaPagamento ||
      filtros.formaPagamento === 'todos' ||
      rec.formaPagamento === filtros.formaPagamento;

    // Filtro de executante
    const matchesExecutante =
      !filtros.executante ||
      filtros.executante === 'todos' ||
      rec.executante === filtros.executante;

    // Filtro de local de atendimento
    const matchesLocalAtendimento =
      !filtros.localAtendimento ||
      filtros.localAtendimento === 'todos' ||
      rec.localAtendimento === filtros.localAtendimento;

    // Filtro de nome procedimento
    const matchesNomeProcedimento =
      !filtros.nomeProcedimento ||
      filtros.nomeProcedimento === 'todos' ||
      rec.nomeProcedimento.toLowerCase().includes(filtros.nomeProcedimento.toLowerCase());

    // Filtro de conta
    const matchesConta =
      !filtros.conta ||
      rec.conta.toLowerCase().includes(filtros.conta.toLowerCase());

    // Filtro de período
    const matchesPeriodo = aplicarFiltroPeriodo(rec.dataAtendimento, filtros.periodo, filtros.dataInicio, filtros.dataFim);

    return matchesStatus && matchesInstituicao && matchesFormaPagamento && matchesExecutante && 
           matchesLocalAtendimento && matchesNomeProcedimento && matchesConta && matchesPeriodo;
  });
};

const aplicarFiltroPeriodo = (
  dataAtendimento: string,
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): boolean => {
  const data = new Date(dataAtendimento);
  const hoje = new Date();

  switch (periodo) {
    case 'hoje':
      return data.toDateString() === hoje.toDateString();
    case 'semana': {
      const inicioSemana = new Date(hoje);
      inicioSemana.setDate(hoje.getDate() - 7);
      return data >= inicioSemana && data <= hoje;
    }
    case 'mes': {
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      return data >= inicioMes && data <= hoje;
    }
    case 'trimestre': {
      const inicioTrimestre = new Date(hoje);
      inicioTrimestre.setMonth(hoje.getMonth() - 3);
      return data >= inicioTrimestre && data <= hoje;
    }
    case 'ano': {
      const inicioAno = new Date(hoje.getFullYear(), 0, 1);
      return data >= inicioAno && data <= hoje;
    }
    case 'personalizado':
      if (dataInicio && dataFim) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        return data >= inicio && data <= fim;
      }
      return true;
    case 'todos':
    default:
      return true;
  }
};
