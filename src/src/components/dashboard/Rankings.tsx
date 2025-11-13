import { TrendingUp, Building2 } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo, CartaoDescricao } from '../../../components/ui/cartao';
import { Progress } from '../../../components/ui/progress';
import { Recebimento } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface RankingsProps {
  recebimentos: Recebimento[];
}

export function Rankings({ recebimentos }: RankingsProps) {
  // Top 5 Procedimentos por Receita
  const receitaPorProcedimento = recebimentos.reduce((acc: any, rec) => {
    const proc = rec.nomeProcedimento || 'Não definido';
    if (!acc[proc]) {
      acc[proc] = { total: 0, quantidade: 0 };
    }
    acc[proc].total += rec.total;
    acc[proc].quantidade += rec.quantidade;
    return acc;
  }, {});

  const topProcedimentos = Object.entries(receitaPorProcedimento)
    .map(([nome, dados]: [string, any]) => ({
      nome,
      valor: dados.total,
      quantidade: dados.quantidade,
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

  const maxProcedimento = topProcedimentos[0]?.valor || 1;

  // Top 5 Planos de Saúde por Receita
  const receitaPorPlano = recebimentos.reduce((acc: any, rec) => {
    const plano = rec.plano || 'Não definido';
    if (!acc[plano]) {
      acc[plano] = { total: 0, atendimentos: 0 };
    }
    acc[plano].total += rec.total;
    acc[plano].atendimentos += 1;
    return acc;
  }, {});

  const topPlanos = Object.entries(receitaPorPlano)
    .map(([nome, dados]: [string, any]) => ({
      nome,
      valor: dados.total,
      atendimentos: dados.atendimentos,
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

  const maxPlano = topPlanos[0]?.valor || 1;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Top 5 Procedimentos */}
      <Cartao>
        <CartaoCabecalho>
          <div className="flex items-center justify-between">
            <div>
              <CartaoTitulo>Top 5 Procedimentos</CartaoTitulo>
              <CartaoDescricao>Mais rentáveis do período</CartaoDescricao>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 122, 163, 0.1)' }}>
              <TrendingUp className="h-5 w-5" style={{ color: '#007AA3' }} />
            </div>
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          <div className="space-y-4">
            {topProcedimentos.map((item, index) => (
              <div key={item.nome} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" 
                      style={{ 
                        backgroundColor: index === 0 ? 'rgba(92, 158, 92, 0.15)' : 'rgba(0, 122, 163, 0.1)',
                        color: index === 0 ? '#5C9E5C' : '#007AA3'
                      }}
                    >
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate" style={{ color: '#333F48' }}>{item.nome}</p>
                      <p className="text-xs" style={{ color: '#6B7785' }}>{item.quantidade} procedimentos</p>
                    </div>
                  </div>
                  <span className="text-sm ml-2 flex-shrink-0" style={{ color: '#333F48' }}>
                    {formatCurrency(item.valor)}
                  </span>
                </div>
                <Progress 
                  value={(item.valor / maxProcedimento) * 100} 
                  className="h-2"
                />
              </div>
            ))}
            {topProcedimentos.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: '#6B7785' }}>
                Nenhum procedimento encontrado
              </p>
            )}
          </div>
        </CartaoConteudo>
      </Cartao>

      {/* Top 5 Planos de Saúde */}
      <Cartao>
        <CartaoCabecalho>
          <div className="flex items-center justify-between">
            <div>
              <CartaoTitulo>Top 5 Planos de Saúde</CartaoTitulo>
              <CartaoDescricao>Principais fontes por receita</CartaoDescricao>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(74, 179, 209, 0.1)' }}>
              <Building2 className="h-5 w-5" style={{ color: '#4AB3D1' }} />
            </div>
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          <div className="space-y-4">
            {topPlanos.map((item, index) => (
              <div key={item.nome} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0" 
                      style={{ 
                        backgroundColor: index === 0 ? 'rgba(92, 158, 92, 0.15)' : 'rgba(74, 179, 209, 0.1)',
                        color: index === 0 ? '#5C9E5C' : '#4AB3D1'
                      }}
                    >
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate" style={{ color: '#333F48' }}>{item.nome}</p>
                      <p className="text-xs" style={{ color: '#6B7785' }}>{item.atendimentos} atendimentos</p>
                    </div>
                  </div>
                  <span className="text-sm ml-2 flex-shrink-0" style={{ color: '#333F48' }}>
                    {formatCurrency(item.valor)}
                  </span>
                </div>
                <Progress 
                  value={(item.valor / maxPlano) * 100} 
                  className="h-2"
                />
              </div>
            ))}
            {topPlanos.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: '#6B7785' }}>
                Nenhum plano encontrado
              </p>
            )}
          </div>
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}