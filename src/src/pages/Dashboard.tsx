import { BarraFiltrosDashboard } from '../components/dashboard/BarraFiltros';
import { CartoesResumo } from '../components/dashboard/CartoesResumo';
import { Graficos } from '../components/dashboard/Graficos';
import { Rankings } from '../components/dashboard/Rankings';
import { SaudeFinanceira } from '../components/dashboard/SaudeFinanceira';
import { useFiltros } from '../contexts/FiltrosContext';
import { useRecebimentos } from '../hooks/useRecebimentos';

export function Dashboard() {
  const { filtrosDashboard } = useFiltros();
  const { recebimentos, metricas, metricasMesAnterior } = useRecebimentos(filtrosDashboard, 'dashboard');

  return (
    <div className="px-4 md:px-6 py-6">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h2 className="mb-2">Dashboard Financeiro</h2>
        <p className="text-gray-600">Visão geral dos recebimentos da clínica</p>
      </div>

      <BarraFiltrosDashboard />
      
      {/* Seção 1: Resumo Financeiro */}
      <div className="mb-8">
        <CartoesResumo
          valorTotal={metricas.valorTotal}
          valorRecebido={metricas.valorRecebido}
          valorPendente={metricas.valorPendente}
          valorAtrasado={metricas.valorAtrasado}
          totalRecebimentos={metricas.totalRecebimentos}
          valorGlosa={metricas.valorGlosa}
          metricasMesAnterior={metricasMesAnterior}
        />
      </div>

      {/* Seção 2: Análises e Gráficos Comparativos */}
      <div className="mb-8">
        <h3 className="mb-4 text-gray-700">Análises e Tendências</h3>
        <Graficos recebimentos={recebimentos} />
      </div>

      {/* Rankings */}
      <div className="mb-8">
        <h3 className="mb-4 text-gray-700">Rankings</h3>
        <Rankings recebimentos={recebimentos} />
      </div>

      {/* Saúde Financeira */}
      <div className="mb-8">
        <h3 className="mb-4 text-gray-700">Saúde Financeira</h3>
        <SaudeFinanceira
          valorTotal={metricas.valorTotal}
          valorRecebido={metricas.valorRecebido}
          valorAtrasado={metricas.valorAtrasado}
          valorGlosa={metricas.valorGlosa}
        />
      </div>
    </div>
  );
}