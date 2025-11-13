import { DollarSign, TrendingDown, Percent, CreditCard, ArrowUp, ArrowDown } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { formatCurrency } from '../../utils/formatters';

interface MetricasRecebimentosProps {
  valorTotalBruto: number;
  totalGlosado: number;
  taxaGlosa: number;
  ticketMedioLiquido: number;
  variacaoValorTotal?: number;
  variacaoGlosa?: number;
  variacaoTaxaGlosa?: number;
  variacaoTicket?: number;
}

export function MetricasRecebimentos({
  valorTotalBruto,
  totalGlosado,
  taxaGlosa,
  ticketMedioLiquido,
  variacaoValorTotal = 0,
  variacaoGlosa = 0,
  variacaoTaxaGlosa = 0,
  variacaoTicket = 0,
}: MetricasRecebimentosProps) {
  const cards = [
    {
      titulo: 'Valor a Receber (Bruto)',
      valor: formatCurrency(valorTotalBruto),
      icone: <DollarSign className="h-5 w-5" style={{ color: '#007AA3' }} />,
      cor: 'rgba(0, 122, 163, 0.1)',
      variacao: variacaoValorTotal,
    },
    {
      titulo: 'Total Glosado no Mês',
      valor: formatCurrency(totalGlosado),
      icone: <TrendingDown className="h-5 w-5" style={{ color: '#C0504D' }} />,
      cor: 'rgba(192, 80, 77, 0.1)',
      variacao: variacaoGlosa,
      isAlerta: true,
    },
    {
      titulo: 'Taxa de Glosa',
      valor: `${taxaGlosa.toFixed(1)}%`,
      icone: <Percent className="h-5 w-5" style={{ color: '#C0504D' }} />,
      cor: 'rgba(192, 80, 77, 0.1)',
      variacao: variacaoTaxaGlosa,
      isAlerta: true,
    },
    {
      titulo: 'Ticket Médio Líquido',
      valor: formatCurrency(ticketMedioLiquido),
      icone: <CreditCard className="h-5 w-5" style={{ color: '#4AB3D1' }} />,
      cor: 'rgba(74, 179, 209, 0.1)',
      variacao: variacaoTicket,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {cards.map((card) => {
        const isPositivo = card.variacao > 0;
        const isNegativo = card.variacao < 0;
        const variacaoColor = isPositivo ? '#5C9E5C' : isNegativo ? '#C0504D' : '#6B7785';
        
        return (
          <Cartao key={card.titulo} className="hover:shadow-md transition-shadow">
            <CartaoCabecalho className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CartaoTitulo className="text-sm">{card.titulo}</CartaoTitulo>
              <div className="p-2 rounded-lg" style={{ backgroundColor: card.cor }}>
                {card.icone}
              </div>
            </CartaoCabecalho>
            <CartaoConteudo>
              <div className="text-2xl mb-1">{card.valor}</div>
              {card.variacao !== 0 && (
                <div className="flex items-center gap-1 text-xs" style={{ color: variacaoColor }}>
                  {isPositivo ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : isNegativo ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : null}
                  <span>{Math.abs(card.variacao).toFixed(1)}% vs mês anterior</span>
                </div>
              )}
            </CartaoConteudo>
          </Cartao>
        );
      })}
    </div>
  );
}