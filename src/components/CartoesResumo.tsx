import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from './ui/cartao';

const stats = [
  {
    title: 'Recebido este mês',
    value: 'R$ 127.450,00',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'A receber',
    value: 'R$ 45.200,00',
    change: '23 faturas',
    changeType: 'neutral',
    icon: Clock,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Recebimentos confirmados',
    value: '156',
    change: '+8.2%',
    changeType: 'positive',
    icon: CheckCircle,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Ticket médio',
    value: 'R$ 817,63',
    change: '+5.1%',
    changeType: 'positive',
    icon: TrendingUp,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
];

export function CartoesResumo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {stat.change} {stat.changeType === 'positive' && 'vs mês anterior'}
              </p>
            </CartaoConteudo>
          </Cartao>
        );
      })}
    </div>
  );
}
