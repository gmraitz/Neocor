import { Search, Filter, Download, Calendar, X } from 'lucide-react';
import { Entrada } from './ui/entrada';
import { Botao } from './ui/botao';
import { Selecao, SelecaoConteudo, SelecaoItem, SelecaoGatilho, SelecaoValor } from './ui/selecao';
import { Cartao, CartaoConteudo } from './ui/cartao';
import { Emblema } from './ui/emblema';

interface FiltrosRecebimentosProps {
  filters: {
    searchTerm: string;
    status: string;
    periodo: string;
    convenio: string;
    formaPagamento: string;
    procedimento: string;
    dataInicio: string;
    dataFim: string;
  };
  setFilters: (filters: any) => void;
}

export function FiltrosRecebimentos({ filters, setFilters }: FiltrosRecebimentosProps) {
  const limparFiltros = () => {
    setFilters({
      searchTerm: '',
      status: 'todos',
      periodo: '30',
      convenio: 'todos',
      formaPagamento: 'todos',
      procedimento: 'todos',
      dataInicio: '',
      dataFim: '',
    });
  };

  const filtrosAtivos = Object.entries(filters).filter(([key, value]) => {
    if (key === 'searchTerm' && value) return true;
    if (key === 'dataInicio' && value) return true;
    if (key === 'dataFim' && value) return true;
    if (value !== 'todos' && value !== '30' && value !== '') return true;
    return false;
  }).length;

  return (
    <Cartao>
      <CartaoConteudo className="space-y-6 py-6">
        {/* Linha 1: Busca e botões principais */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
            <Entrada
              placeholder="Buscar por paciente, número da fatura ou procedimento..."
              className="pl-10 w-full"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>

          <div className="flex gap-2 shrink-0">
            {filtrosAtivos > 0 && (
              <Botao variant="outline" onClick={limparFiltros} className="gap-2 whitespace-nowrap">
                <X className="h-4 w-4" />
                Limpar ({filtrosAtivos})
              </Botao>
            )}
            <Botao variant="outline" className="gap-2 whitespace-nowrap">
              <Download className="h-4 w-4" />
              Exportar
            </Botao>
          </div>
        </div>

        {/* Linha 2: Filtros principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Selecao
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelecaoGatilho className="w-full">
              <SelecaoValor placeholder="Status" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos os status</SelecaoItem>
              <SelecaoItem value="recebido">✓ Recebido</SelecaoItem>
              <SelecaoItem value="pendente">⏳ Pendente</SelecaoItem>
              <SelecaoItem value="atrasado">⚠ Atrasado</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>

          <Selecao
            value={filters.periodo}
            onValueChange={(value) => setFilters({ ...filters, periodo: value })}
          >
            <SelecaoGatilho className="w-full">
              <SelecaoValor placeholder="Período" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="7">Últimos 7 dias</SelecaoItem>
              <SelecaoItem value="30">Últimos 30 dias</SelecaoItem>
              <SelecaoItem value="90">Últimos 90 dias</SelecaoItem>
              <SelecaoItem value="180">Últimos 6 meses</SelecaoItem>
              <SelecaoItem value="365">Último ano</SelecaoItem>
              <SelecaoItem value="custom">Período customizado</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>

          <Selecao
            value={filters.convenio}
            onValueChange={(value) => setFilters({ ...filters, convenio: value })}
          >
            <SelecaoGatilho className="w-full">
              <SelecaoValor placeholder="Convênio" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos os convênios</SelecaoItem>
              <SelecaoItem value="particular">Particular</SelecaoItem>
              <SelecaoItem value="unimed">Unimed</SelecaoItem>
              <SelecaoItem value="bradesco">Bradesco Saúde</SelecaoItem>
              <SelecaoItem value="amil">Amil</SelecaoItem>
              <SelecaoItem value="sulamerica">SulAmérica</SelecaoItem>
              <SelecaoItem value="outros">Outros</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>

          <Selecao
            value={filters.formaPagamento}
            onValueChange={(value) => setFilters({ ...filters, formaPagamento: value })}
          >
            <SelecaoGatilho className="w-full">
              <SelecaoValor placeholder="Forma de Pagamento" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todas as formas</SelecaoItem>
              <SelecaoItem value="pix">PIX</SelecaoItem>
              <SelecaoItem value="cartao_credito">Cartão de Crédito</SelecaoItem>
              <SelecaoItem value="cartao_debito">Cartão de Débito</SelecaoItem>
              <SelecaoItem value="dinheiro">Dinheiro</SelecaoItem>
              <SelecaoItem value="convenio">Convênio</SelecaoItem>
              <SelecaoItem value="boleto">Boleto</SelecaoItem>
              <SelecaoItem value="transferencia">Transferência</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Linha 3: Filtros adicionais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Selecao
            value={filters.procedimento}
            onValueChange={(value) => setFilters({ ...filters, procedimento: value })}
          >
            <SelecaoGatilho className="w-full">
              <SelecaoValor placeholder="Procedimento" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos os procedimentos</SelecaoItem>
              <SelecaoItem value="consulta">Consultas</SelecaoItem>
              <SelecaoItem value="exame">Exames</SelecaoItem>
              <SelecaoItem value="cirurgia">Cirurgias</SelecaoItem>
              <SelecaoItem value="retorno">Retornos</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>

          {filters.periodo === 'custom' && (
            <>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
                <Entrada
                  type="date"
                  placeholder="Data início"
                  className="pl-10 w-full"
                  value={filters.dataInicio}
                  onChange={(e) => setFilters({ ...filters, dataInicio: e.target.value })}
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
                <Entrada
                  type="date"
                  placeholder="Data fim"
                  className="pl-10 w-full"
                  value={filters.dataFim}
                  onChange={(e) => setFilters({ ...filters, dataFim: e.target.value })}
                />
              </div>
            </>
          )}
        </div>

        {/* Indicador de filtros ativos */}
        {filtrosAtivos > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {filtrosAtivos} {filtrosAtivos === 1 ? 'filtro ativo' : 'filtros ativos'}
            </span>
          </div>
        )}
      </CartaoConteudo>
    </Cartao>
  );
}
