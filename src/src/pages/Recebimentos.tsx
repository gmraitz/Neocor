import { FiltrosRecebimentos } from '../components/recebimentos/FiltrosRecebimentos';
import { MetricasRecebimentos } from '../components/recebimentos/MetricasRecebimentos';
import { TabelaRecebimentos } from '../components/recebimentos/TabelaRecebimentos';
import { useFiltros } from '../contexts/FiltrosContext';
import { useRecebimentos } from '../hooks/useRecebimentos';
import { useConsolidacao } from '../hooks/useConsolidacao';
import { DadosConsolidacao } from '../components/recebimentos/DialogConsolidacao';
import { toast } from 'sonner@2.0.3';
import { useMemo } from 'react';

export function Recebimentos() {
  const { filtrosRecebimentos } = useFiltros();
  const { recebimentos: recebimentosOriginais, metricas, metricasMesAnterior } = useRecebimentos(filtrosRecebimentos, 'recebimentos');
  const { consolidacoes, salvarConsolidacao, obterConsolidacao } = useConsolidacao();

  // Aplicar status de consolidação aos recebimentos
  const recebimentos = useMemo(() => {
    return recebimentosOriginais.map((recebimento) => {
      const consolidacao = obterConsolidacao(recebimento.id);
      if (consolidacao) {
        return {
          ...recebimento,
          statusConsolidacao: consolidacao.statusConsolidacao,
          valorPagoParcial: consolidacao.valorPago,
        };
      }
      return recebimento;
    });
  }, [recebimentosOriginais, obterConsolidacao, consolidacoes]);

  const handleAtualizarConsolidacao = (id: string, dados: DadosConsolidacao) => {
    salvarConsolidacao(id, dados);
    
    // Mensagem de sucesso
    const mensagens = {
      consolidado: 'Recebimento consolidado com sucesso! ✓',
      glosado: 'Glosa registrada com sucesso.',
      'pago-parcial': 'Pagamento parcial registrado.',
      aberto: 'Status atualizado para aberto.',
    };
    
    toast.success(mensagens[dados.statusConsolidacao] || 'Consolidação salva com sucesso!');
  };

  // Calcular variações percentuais
  const calcularVariacao = (atual: number, anterior: number) => {
    if (anterior === 0) return 0;
    return ((atual - anterior) / anterior) * 100;
  };

  const variacaoValorTotal = metricasMesAnterior 
    ? calcularVariacao(metricas.valorTotalBruto, metricasMesAnterior.valorTotalBruto)
    : 0;
  const variacaoGlosa = metricasMesAnterior
    ? calcularVariacao(metricas.totalGlosado, metricasMesAnterior.totalGlosado)
    : 0;
  const variacaoTaxaGlosa = metricasMesAnterior
    ? calcularVariacao(metricas.taxaGlosa, metricasMesAnterior.taxaGlosa)
    : 0;
  const variacaoTicket = metricasMesAnterior
    ? calcularVariacao(metricas.ticketMedioLiquido, metricasMesAnterior.ticketMedioLiquido)
    : 0;

  return (
    <div className="px-4 md:px-6 py-6">
      <div className="mb-6">
        <h2 className="mb-2">Recebimentos e Consolidação</h2>
        <p style={{ color: '#6B7785' }}>Gestão completa de recebimentos, glosas e consolidação</p>
      </div>

      <FiltrosRecebimentos />

      <MetricasRecebimentos
        valorTotalBruto={metricas.valorTotalBruto}
        totalGlosado={metricas.totalGlosado}
        taxaGlosa={metricas.taxaGlosa}
        ticketMedioLiquido={metricas.ticketMedioLiquido}
        variacaoValorTotal={variacaoValorTotal}
        variacaoGlosa={variacaoGlosa}
        variacaoTaxaGlosa={variacaoTaxaGlosa}
        variacaoTicket={variacaoTicket}
      />

      <TabelaRecebimentos 
        recebimentos={recebimentos} 
        onAtualizarConsolidacao={handleAtualizarConsolidacao}
      />
    </div>
  );
}