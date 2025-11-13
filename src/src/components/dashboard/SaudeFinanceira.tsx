import { Activity, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo, CartaoDescricao } from '../../../components/ui/cartao';
import { Progress } from '../../../components/ui/progress';

interface SaudeFinanceiraProps {
  valorTotal: number;
  valorRecebido: number;
  valorAtrasado: number;
  valorGlosa: number;
}

export function SaudeFinanceira({ 
  valorTotal, 
  valorRecebido, 
  valorAtrasado,
  valorGlosa 
}: SaudeFinanceiraProps) {
  // Cálculo da nota de saúde financeira (0-100)
  const taxaRecebimento = valorTotal > 0 ? (valorRecebido / valorTotal) * 100 : 0;
  const taxaInadimplencia = valorTotal > 0 ? (valorAtrasado / valorTotal) * 100 : 0;
  const taxaGlosa = valorTotal > 0 ? (valorGlosa / valorTotal) * 100 : 0;

  // Peso dos fatores na nota final
  const notaRecebimento = taxaRecebimento * 0.5; // 50% da nota
  const penalidadeInadimplencia = taxaInadimplencia * 0.3; // 30% de penalidade
  const penalidadeGlosa = taxaGlosa * 0.2; // 20% de penalidade

  const notaFinal = Math.max(0, Math.min(100, notaRecebimento - penalidadeInadimplencia - penalidadeGlosa));

  // Classificação da saúde financeira
  const getClassificacao = (nota: number) => {
    if (nota >= 80) return { label: 'Excelente', cor: '#5C9E5C', bgCor: 'rgba(92, 158, 92, 0.1)', corCirculo: '#5C9E5C', icon: CheckCircle2 };
    if (nota >= 60) return { label: 'Bom', cor: '#007AA3', bgCor: 'rgba(0, 122, 163, 0.1)', corCirculo: '#007AA3', icon: Activity };
    if (nota >= 40) return { label: 'Regular', cor: '#6B7785', bgCor: 'rgba(107, 119, 133, 0.1)', corCirculo: '#6B7785', icon: AlertCircle };
    return { label: 'Crítico', cor: '#C0504D', bgCor: 'rgba(192, 80, 77, 0.1)', corCirculo: '#C0504D', icon: XCircle };
  };

  const classificacao = getClassificacao(notaFinal);
  const Icon = classificacao.icon;

  // Sugestões baseadas na nota
  const getSugestoes = () => {
    const sugestoes = [];
    
    if (taxaInadimplencia > 15) {
      sugestoes.push('Reduza pendências acima de 15 dias para melhorar a nota.');
    }
    
    if (taxaGlosa > 5) {
      sugestoes.push('Analise e conteste glosas para recuperar receita.');
    }
    
    if (taxaRecebimento < 70) {
      sugestoes.push('Agilize o processo de cobrança dos valores pendentes.');
    }

    if (sugestoes.length === 0) {
      sugestoes.push('Continue mantendo a excelência na gestão financeira!');
    }

    return sugestoes;
  };

  const sugestoes = getSugestoes();

  return (
    <Cartao>
      <CartaoCabecalho>
        <div>
          <CartaoTitulo>Saúde Financeira</CartaoTitulo>
          <CartaoDescricao>Indicador geral de performance</CartaoDescricao>
        </div>
      </CartaoCabecalho>
      <CartaoConteudo>
        <div className="space-y-6">
          {/* Nota e Classificação */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={classificacao.corCirculo}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(notaFinal / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl">{Math.round(notaFinal)}</span>
                  <span className="text-xs text-gray-500">de 100</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3`} style={{ backgroundColor: classificacao.bgCor }}>
                <Icon className="h-4 w-4" style={{ color: classificacao.cor }} />
                <span className="text-sm" style={{ color: classificacao.cor }}>
                  {classificacao.label}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1" style={{ color: '#6B7785' }}>
                    <span>Taxa de Recebimento</span>
                    <span>{taxaRecebimento.toFixed(1)}%</span>
                  </div>
                  <Progress value={taxaRecebimento} className="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1" style={{ color: '#6B7785' }}>
                    <span>Inadimplência</span>
                    <span>{taxaInadimplencia.toFixed(1)}%</span>
                  </div>
                  <Progress value={taxaInadimplencia} className="h-1.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Sugestões */}
          <div className="pt-4 border-t">
            <p className="text-sm mb-3" style={{ color: '#333F48' }}>Sugestões de Melhoria:</p>
            <ul className="space-y-2">
              {sugestoes.map((sugestao, index) => (
                <li key={index} className="flex items-start gap-2 text-xs" style={{ color: '#6B7785' }}>
                  <span style={{ color: '#007AA3' }} className="mt-0.5">•</span>
                  <span className="flex-1">{sugestao}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CartaoConteudo>
    </Cartao>
  );
}