import { Search, Calendar, Filter, Hash } from 'lucide-react';
import { Selecao, SelecaoConteudo, SelecaoItem, SelecaoGatilho, SelecaoValor } from '../../../components/ui/selecao';
import { Entrada } from '../../../components/ui/entrada';
import { useFiltros } from '../../contexts/FiltrosContext';

export function FiltrosRecebimentos() {
  const { filtrosRecebimentos, atualizarFiltroRecebimentos } = useFiltros();

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" style={{ color: '#6B7785' }} />
        <h3>Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Busca textual */}
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Busca Geral</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#6B7785' }} />
            <Entrada
              placeholder="Buscar por beneficiário, guia, código, procedimento..."
              value={filtrosRecebimentos.searchTerm}
              onChange={(e) => atualizarFiltroRecebimentos('searchTerm', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Busca por Código Glosa */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Código Glosa</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#6B7785' }} />
            <Entrada
              placeholder="Código da glosa"
              value={filtrosRecebimentos.codGlosa || ''}
              onChange={(e) => atualizarFiltroRecebimentos('codGlosa', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status de Consolidação */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Status Consolidação</label>
          <Selecao
            value={filtrosRecebimentos.statusConsolidacao || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('statusConsolidacao', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="aberto">Aberto</SelecaoItem>
              <SelecaoItem value="pago-parcial">Pago Parcial</SelecaoItem>
              <SelecaoItem value="glosado">Glosa Total</SelecaoItem>
              <SelecaoItem value="consolidado">Consolidado</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Tipo de Período */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Tipo de Data</label>
          <Selecao
            value={filtrosRecebimentos.tipoPeriodo || 'dataAtendimento'}
            onValueChange={(value) => atualizarFiltroRecebimentos('tipoPeriodo', value as 'dataAtendimento' | 'dataConta')}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="dataAtendimento">Data Atendimento</SelecaoItem>
              <SelecaoItem value="dataConta">Data da Conta</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Período</label>
          <Selecao
            value={filtrosRecebimentos.periodo}
            onValueChange={(value) => atualizarFiltroRecebimentos('periodo', value)}
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

        {/* Status */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Status</label>
          <Selecao
            value={filtrosRecebimentos.status}
            onValueChange={(value) => atualizarFiltroRecebimentos('status', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos os status</SelecaoItem>
              <SelecaoItem value="recebido">Recebido</SelecaoItem>
              <SelecaoItem value="pendente">Pendente</SelecaoItem>
              <SelecaoItem value="atrasado">Atrasado</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Instituição */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Banco/Convênio</label>
          <Selecao
            value={filtrosRecebimentos.instituicao || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('instituicao', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Banco do Brasil">Banco do Brasil</SelecaoItem>
              <SelecaoItem value="Caixa">Caixa</SelecaoItem>
              <SelecaoItem value="Sicredi">Sicredi</SelecaoItem>
              <SelecaoItem value="Unimed">Unimed</SelecaoItem>
              <SelecaoItem value="Polisaude">Polisaude</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Forma de Pagamento */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Forma de Pagamento</label>
          <Selecao
            value={filtrosRecebimentos.formaPagamento || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('formaPagamento', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todas</SelecaoItem>
              <SelecaoItem value="PIX">PIX</SelecaoItem>
              <SelecaoItem value="Cartão de Crédito">Cartão de Crédito</SelecaoItem>
              <SelecaoItem value="Convênio">Convênio</SelecaoItem>
              <SelecaoItem value="Dinheiro">Dinheiro</SelecaoItem>
              <SelecaoItem value="Boleto">Boleto</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Executante */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Executante</label>
          <Selecao
            value={filtrosRecebimentos.executante || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('executante', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Dr. Carlos Mendes">Dr. Carlos Mendes</SelecaoItem>
              <SelecaoItem value="Dr. Roberto Lima">Dr. Roberto Lima</SelecaoItem>
              <SelecaoItem value="Dr. Fernando Souza">Dr. Fernando Souza</SelecaoItem>
              <SelecaoItem value="Dr. Paulo Santos">Dr. Paulo Santos</SelecaoItem>
              <SelecaoItem value="Dr. Marcelo Oliveira">Dr. Marcelo Oliveira</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Local de Atendimento */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Local de Atendimento</label>
          <Selecao
            value={filtrosRecebimentos.localAtendimento || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('localAtendimento', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Clínica NEOCOR - Unidade Centro">Unidade Centro</SelecaoItem>
              <SelecaoItem value="Clínica NEOCOR - Unidade Sul">Unidade Sul</SelecaoItem>
              <SelecaoItem value="Clínica NEOCOR - Unidade Norte">Unidade Norte</SelecaoItem>
              <SelecaoItem value="Hospital NEOCOR">Hospital NEOCOR</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Prestador Arquivo */}
        <div>
          <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Prestador</label>
          <Selecao
            value={filtrosRecebimentos.prestadorArquivo || 'todos'}
            onValueChange={(value) => atualizarFiltroRecebimentos('prestadorArquivo', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="NEOCOR">NEOCOR</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>
      </div>

      {/* Datas personalizadas */}
      {filtrosRecebimentos.periodo === 'personalizado' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div>
            <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Data Inicial</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: '#6B7785' }} />
              <Entrada
                type="date"
                value={filtrosRecebimentos.dataInicio || ''}
                onChange={(e) => atualizarFiltroRecebimentos('dataInicio', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#333F48' }}>Data Final</label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: '#6B7785' }} />
              <Entrada
                type="date"
                value={filtrosRecebimentos.dataFim || ''}
                onChange={(e) => atualizarFiltroRecebimentos('dataFim', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}