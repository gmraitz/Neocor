import { Search, Filter, Download } from 'lucide-react';
import { Entrada } from './ui/entrada';
import { Botao } from './ui/botao';
import { Selecao, SelecaoConteudo, SelecaoItem, SelecaoGatilho, SelecaoValor } from './ui/selecao';

interface BarraFiltrosProps {
  filters: {
    searchTerm: string;
    status: string;
    periodo: string;
  };
  setFilters: (filters: any) => void;
}

export function BarraFiltros({ filters, setFilters }: BarraFiltrosProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Entrada
            placeholder="Buscar por paciente, número da fatura..."
            className="pl-10"
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />
        </div>

        <Selecao
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelecaoGatilho className="w-full md:w-48">
            <SelecaoValor placeholder="Status" />
          </SelecaoGatilho>
          <SelecaoConteudo>
            <SelecaoItem value="todos">Todos os status</SelecaoItem>
            <SelecaoItem value="recebido">Recebido</SelecaoItem>
            <SelecaoItem value="pendente">Pendente</SelecaoItem>
            <SelecaoItem value="atrasado">Atrasado</SelecaoItem>
          </SelecaoConteudo>
        </Selecao>

        <Selecao
          value={filters.periodo}
          onValueChange={(value) => setFilters({ ...filters, periodo: value })}
        >
          <SelecaoGatilho className="w-full md:w-48">
            <SelecaoValor placeholder="Período" />
          </SelecaoGatilho>
          <SelecaoConteudo>
            <SelecaoItem value="7">Últimos 7 dias</SelecaoItem>
            <SelecaoItem value="30">Últimos 30 dias</SelecaoItem>
            <SelecaoItem value="90">Últimos 90 dias</SelecaoItem>
            <SelecaoItem value="365">Último ano</SelecaoItem>
          </SelecaoConteudo>
        </Selecao>

        <Botao variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Botao>
      </div>
    </div>
  );
}
