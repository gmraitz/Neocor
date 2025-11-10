import { BarraFiltrosDashboard } from '../components/dashboard/BarraFiltros';
import { CartoesResumo } from '../components/dashboard/CartoesResumo';
import { Graficos } from '../components/dashboard/Graficos';
import { useFiltros } from '../contexts/FiltrosContext';
import { useRecebimentos } from '../hooks/useRecebimentos';

export function Dashboard() {
  const { filtrosDashboard } = useFiltros();
  const { recebimentos, metricas } = useRecebimentos(filtrosDashboard, 'dashboard');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="mb-2">Dashboard Financeiro</h2>
        <p className="text-gray-600">Visão geral dos recebimentos da clínica</p>
      </div>

      <BarraFiltrosDashboard />
      
      <CartoesResumo
        valorTotal={metricas.valorTotal}
        valorRecebido={metricas.valorRecebido}
        valorPendente={metricas.valorPendente}
        valorAtrasado={metricas.valorAtrasado}
      />

      <Graficos recebimentos={recebimentos} />
    </div>
  );
}
