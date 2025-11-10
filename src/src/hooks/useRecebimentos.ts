import { useMemo } from 'react';
import { recebimentosMock } from '../services/recebimentosData';
import { aplicarFiltrosRecebimentos, aplicarFiltrosDashboard } from '../utils/filters';
import { FiltrosRecebimentos, FiltrosDashboard, Recebimento } from '../types';

export const useRecebimentos = (filtros: FiltrosRecebimentos | FiltrosDashboard, tipo: 'recebimentos' | 'dashboard' = 'recebimentos') => {
  const recebimentosFiltrados = useMemo(() => {
    if (tipo === 'recebimentos') {
      return aplicarFiltrosRecebimentos(recebimentosMock, filtros as FiltrosRecebimentos);
    } else {
      return aplicarFiltrosDashboard(recebimentosMock, filtros as FiltrosDashboard);
    }
  }, [filtros, tipo]);

  const metricas = useMemo(() => {
    return calcularMetricas(recebimentosFiltrados);
  }, [recebimentosFiltrados]);

  return {
    recebimentos: recebimentosFiltrados,
    metricas,
  };
};

const calcularMetricas = (recebimentos: Recebimento[]) => {
  const totalRecebimentos = recebimentos.length;
  const recebimentosRecebidos = recebimentos.filter((r) => r.status === 'recebido');
  const recebimentosPendentes = recebimentos.filter((r) => r.status === 'pendente');
  const recebimentosAtrasados = recebimentos.filter((r) => r.status === 'atrasado');

  const valorTotal = recebimentos.reduce((acc, r) => acc + r.total, 0);
  const valorRecebido = recebimentosRecebidos.reduce((acc, r) => acc + r.total, 0);
  const valorPendente = recebimentosPendentes.reduce((acc, r) => acc + r.total, 0);
  const valorAtrasado = recebimentosAtrasados.reduce((acc, r) => acc + r.total, 0);
  const valorGlosa = recebimentos.reduce((acc, r) => acc + r.glosa, 0);

  const taxaConversao = totalRecebimentos > 0 
    ? (recebimentosRecebidos.length / totalRecebimentos) * 100 
    : 0;

  const maiorRecebimento = recebimentos.length > 0
    ? Math.max(...recebimentos.map((r) => r.total))
    : 0;

  // Recebimentos de hoje
  const hoje = new Date().toDateString();
  const recebimentosHoje = recebimentos.filter(
    (r) => new Date(r.dataAtendimento).toDateString() === hoje
  );
  const valorRecebimentosHoje = recebimentosHoje.reduce((acc, r) => acc + r.total, 0);

  return {
    totalRecebimentos,
    valorTotal,
    valorRecebido,
    valorPendente,
    valorAtrasado,
    valorGlosa,
    taxaConversao,
    maiorRecebimento,
    recebimentosRecebidos: recebimentosRecebidos.length,
    recebimentosPendentes: recebimentosPendentes.length,
    recebimentosAtrasados: recebimentosAtrasados.length,
    valorRecebimentosHoje,
    recebimentosHoje: recebimentosHoje.length,
  };
};
