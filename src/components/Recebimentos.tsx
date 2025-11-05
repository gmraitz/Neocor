import { useState } from 'react';
import { FiltrosRecebimentos } from './FiltrosRecebimentos';
import { TabelaRecebimentos } from './TabelaRecebimentos';
import { FileText, CreditCard, BarChart3, Calendar } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from './ui/cartao';

export function Recebimentos() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'todos',
    periodo: '30',
    convenio: 'todos',
    formaPagamento: 'todos',
    procedimento: 'todos',
    dataInicio: '',
    dataFim: '',
  });

  // Estatísticas específicas para o módulo de recebimentos
  const stats = [
    {
      title: 'Total de Faturas',
      value: '184',
      subtitle: 'Últimos 30 dias',
      icon: FileText,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Taxa de Conversão',
      value: '84.8%',
      subtitle: '156 de 184 faturas',
      icon: BarChart3,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Recebimentos Hoje',
      value: '12',
      subtitle: 'R$ 9.850,00',
      icon: Calendar,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Maior Recebimento',
      value: 'R$ 4.500,00',
      subtitle: 'Cirurgia cardíaca',
      icon: CreditCard,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Recebimentos</h1>
        <p className="text-gray-600">Gerencie e acompanhe todos os recebimentos da clínica</p>
      </div>

      {/* Cards de resumo do módulo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Cartao key={stat.title}>
              <CartaoCabecalho className="flex flex-row items-center justify-between pb-2">
                <CartaoTitulo className="text-sm text-gray-600">
                  {stat.title}
                </CartaoTitulo>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CartaoCabecalho>
              <CartaoConteudo>
                <div className="text-gray-900 mb-1">{stat.value}</div>
                {stat.subtitle && (
                  <p className="text-sm text-gray-600">{stat.subtitle}</p>
                )}
              </CartaoConteudo>
            </Cartao>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <FiltrosRecebimentos filters={filters} setFilters={setFilters} />
      </div>

      {/* Tabela de recebimentos */}
      <TabelaRecebimentos filters={filters} />
    </div>
  );
}
