import { Calendar, Filter } from 'lucide-react';
import { Selecao, SelecaoConteudo, SelecaoItem, SelecaoGatilho, SelecaoValor } from '../../../components/ui/selecao';
import { Entrada } from '../../../components/ui/entrada';
import { useFiltros } from '../../contexts/FiltrosContext';

export function BarraFiltrosDashboard() {
  const { filtrosDashboard, atualizarFiltroDashboard } = useFiltros();

  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3>Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Período */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Período</label>
          <Selecao
            value={filtrosDashboard.periodo}
            onValueChange={(value) => atualizarFiltroDashboard('periodo', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos os períodos</SelecaoItem>
              <SelecaoItem value="hoje">Hoje</SelecaoItem>
              <SelecaoItem value="semana">Última semana</SelecaoItem>
              <SelecaoItem value="mes">Último mês</SelecaoItem>
              <SelecaoItem value="trimestre">Último trimestre</SelecaoItem>
              <SelecaoItem value="ano">Último ano</SelecaoItem>
              <SelecaoItem value="personalizado">Personalizado</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Executante */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Executante</label>
          <Selecao
            value={filtrosDashboard.executante || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('executante', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Dr. Carlos Mendes">Dr. Carlos Mendes</SelecaoItem>
              <SelecaoItem value="Dra. Ana Paula Costa">Dra. Ana Paula Costa</SelecaoItem>
              <SelecaoItem value="Dr. Roberto Silva">Dr. Roberto Silva</SelecaoItem>
              <SelecaoItem value="Dra. Mariana Santos">Dra. Mariana Santos</SelecaoItem>
              <SelecaoItem value="Dr. Fernando Oliveira">Dr. Fernando Oliveira</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Beneficiário */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Beneficiário</label>
          <Selecao
            value={filtrosDashboard.beneficiario || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('beneficiario', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Maria Silva Santos">Maria Silva Santos</SelecaoItem>
              <SelecaoItem value="João Pedro Oliveira">João Pedro Oliveira</SelecaoItem>
              <SelecaoItem value="Ana Beatriz Costa">Ana Beatriz Costa</SelecaoItem>
              <SelecaoItem value="Carlos Eduardo Lima">Carlos Eduardo Lima</SelecaoItem>
              <SelecaoItem value="Fernanda Rodrigues">Fernanda Rodrigues</SelecaoItem>
              <SelecaoItem value="Roberto Alves">Roberto Alves</SelecaoItem>
              <SelecaoItem value="Juliana Martins">Juliana Martins</SelecaoItem>
              <SelecaoItem value="Pedro Henrique Santos">Pedro Henrique Santos</SelecaoItem>
              <SelecaoItem value="Camila Souza">Camila Souza</SelecaoItem>
              <SelecaoItem value="Lucas Ferreira">Lucas Ferreira</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>
      </div>

      {/* Datas personalizadas */}
      {filtrosDashboard.periodo === 'personalizado' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Data Inicial</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Entrada
                type="date"
                value={filtrosDashboard.dataInicio || ''}
                onChange={(e) => atualizarFiltroDashboard('dataInicio', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Data Final</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Entrada
                type="date"
                value={filtrosDashboard.dataFim || ''}
                onChange={(e) => atualizarFiltroDashboard('dataFim', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}