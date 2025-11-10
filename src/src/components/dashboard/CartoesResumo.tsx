import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { formatCurrency } from '../../utils/formatters';

interface MetricasProps {
  valorTotal: number;
  valorRecebido: number;
  valorPendente: number;
  valorAtrasado: number;
}

export function CartoesResumo({ valorTotal, valorRecebido, valorPendente, valorAtrasado }: MetricasProps) {
  const cards = [
    {
      titulo: 'Receita Total',
      valor: formatCurrency(valorTotal),
      icone: <DollarSign className="h-5 w-5 text-blue-600" />,
      cor: 'bg-blue-50',
    },
    {
      titulo: 'Recebido',
      valor: formatCurrency(valorRecebido),
      icone: <TrendingUp className="h-5 w-5 text-green-600" />,
      cor: 'bg-green-50',
    },
    {
      titulo: 'Pendente',
      valor: formatCurrency(valorPendente),
      icone: <TrendingDown className="h-5 w-5 text-yellow-600" />,
      cor: 'bg-yellow-50',
    },
    {
      titulo: 'Atrasado',
      valor: formatCurrency(valorAtrasado),
      icone: <AlertCircle className="h-5 w-5 text-red-600" />,
      cor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {cards.map((card) => (
        <Cartao key={card.titulo}>
          <CartaoCabecalho className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CartaoTitulo className="text-sm">{card.titulo}</CartaoTitulo>
            <div className={`p-2 rounded-lg ${card.cor}`}>
              {card.icone}
            </div>
          </CartaoCabecalho>
          <CartaoConteudo>
            <div className="text-2xl">{card.valor}</div>
          </CartaoConteudo>
        </Cartao>
      ))}
    </div>
  );
}
