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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Status */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Status</label>
          <Selecao
            value={filtrosDashboard.status || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('status', value)}
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

        {/* Banco/Convênio */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Banco/Convênio</label>
          <Selecao
            value={filtrosDashboard.instituicao || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('instituicao', value)}
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
          <label className="block text-sm mb-1 text-gray-700">Forma de Pagamento</label>
          <Selecao
            value={filtrosDashboard.formaPagamento || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('formaPagamento', value)}
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
              <SelecaoItem value="Dr. Roberto Lima">Dr. Roberto Lima</SelecaoItem>
              <SelecaoItem value="Dr. Fernando Souza">Dr. Fernando Souza</SelecaoItem>
              <SelecaoItem value="Dra. Juliana Martins">Dra. Juliana Martins</SelecaoItem>
              <SelecaoItem value="Dr. Paulo Santos">Dr. Paulo Santos</SelecaoItem>
              <SelecaoItem value="Dr. Marcelo Oliveira">Dr. Marcelo Oliveira</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Local de Atendimento */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Local de Atendimento</label>
          <Selecao
            value={filtrosDashboard.localAtendimento || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('localAtendimento', value)}
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

        {/* Nome do Procedimento */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Nome do Procedimento</label>
          <Selecao
            value={filtrosDashboard.nomeProcedimento || 'todos'}
            onValueChange={(value) => atualizarFiltroDashboard('nomeProcedimento', value)}
          >
            <SelecaoGatilho>
              <SelecaoValor placeholder="Selecione" />
            </SelecaoGatilho>
            <SelecaoConteudo>
              <SelecaoItem value="todos">Todos</SelecaoItem>
              <SelecaoItem value="Consulta Cardiologia">Consulta Cardiologia</SelecaoItem>
              <SelecaoItem value="Ecocardiograma">Ecocardiograma</SelecaoItem>
              <SelecaoItem value="Holter">Holter</SelecaoItem>
              <SelecaoItem value="Teste Ergométrico">Teste Ergométrico</SelecaoItem>
              <SelecaoItem value="Cateterismo">Cateterismo</SelecaoItem>
              <SelecaoItem value="MAPA">MAPA</SelecaoItem>
              <SelecaoItem value="Eletrocardiograma">Eletrocardiograma</SelecaoItem>
              <SelecaoItem value="Cintilografia">Cintilografia</SelecaoItem>
              <SelecaoItem value="Angiotomografia">Angiotomografia</SelecaoItem>
              <SelecaoItem value="Ressonância">Ressonância</SelecaoItem>
            </SelecaoConteudo>
          </Selecao>
        </div>

        {/* Conta */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Conta</label>
          <Entrada
            type="text"
            value={filtrosDashboard.conta || ''}
            onChange={(e) => atualizarFiltroDashboard('conta', e.target.value)}
            placeholder="Digite o número da conta"
          />
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
