import { FiltrosRecebimentos } from '../components/recebimentos/FiltrosRecebimentos';
import { MetricasRecebimentos } from '../components/recebimentos/MetricasRecebimentos';
import { TabelaRecebimentos } from '../components/recebimentos/TabelaRecebimentos';
import { useFiltros } from '../contexts/FiltrosContext';
import { useRecebimentos } from '../hooks/useRecebimentos';

export function Recebimentos() {
  const { filtrosRecebimentos } = useFiltros();
  const { recebimentos, metricas } = useRecebimentos(filtrosRecebimentos, 'recebimentos');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="mb-2">Recebimentos</h2>
        <p className="text-gray-600">Gestão completa de recebimentos e faturas</p>
      </div>

      <FiltrosRecebimentos />

      <MetricasRecebimentos
        totalRecebimentos={metricas.totalRecebimentos}
        taxaConversao={metricas.taxaConversao}
        valorRecebimentosHoje={metricas.valorRecebimentosHoje}
        maiorRecebimento={metricas.maiorRecebimento}
      />

      <TabelaRecebimentos recebimentos={recebimentos} />
    </div>
  );
}
