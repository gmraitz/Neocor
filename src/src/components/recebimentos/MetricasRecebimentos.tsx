import { FileText, TrendingUp, DollarSign, Award } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { formatCurrency } from '../../utils/formatters';

interface MetricasRecebimentosProps {
  totalRecebimentos: number;
  taxaConversao: number;
  valorRecebimentosHoje: number;
  maiorRecebimento: number;
}

export function MetricasRecebimentos({
  totalRecebimentos,
  taxaConversao,
  valorRecebimentosHoje,
  maiorRecebimento,
}: MetricasRecebimentosProps) {
  const cards = [
    {
      titulo: 'Total de Faturas',
      valor: totalRecebimentos.toString(),
      icone: <FileText className="h-5 w-5 text-blue-600" />,
      cor: 'bg-blue-50',
    },
    {
      titulo: 'Taxa de Conversão',
      valor: `${taxaConversao.toFixed(1)}%`,
      icone: <TrendingUp className="h-5 w-5 text-green-600" />,
      cor: 'bg-green-50',
    },
    {
      titulo: 'Recebimentos Hoje',
      valor: formatCurrency(valorRecebimentosHoje),
      icone: <DollarSign className="h-5 w-5 text-purple-600" />,
      cor: 'bg-purple-50',
    },
    {
      titulo: 'Maior Recebimento',
      valor: formatCurrency(maiorRecebimento),
      icone: <Award className="h-5 w-5 text-yellow-600" />,
      cor: 'bg-yellow-50',
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
