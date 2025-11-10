import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { Recebimento } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface GraficosProps {
  recebimentos: Recebimento[];
}

export function Graficos({ recebimentos }: GraficosProps) {
  // Dados para gráfico de recebimentos mensais
  const recebimentosPorMes = recebimentos.reduce((acc: any, rec) => {
    const mes = new Date(rec.dataAtendimento).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    if (!acc[mes]) {
      acc[mes] = 0;
    }
    acc[mes] += rec.total;
    return acc;
  }, {});

  const dadosBarChart = Object.entries(recebimentosPorMes).map(([mes, valor]) => ({
    mes,
    valor,
  }));

  // Dados para gráfico de formas de pagamento
  const recebimentosPorFormaPagamento = recebimentos.reduce((acc: any, rec) => {
    const forma = rec.formaPagamento || 'Não definido';
    if (!acc[forma]) {
      acc[forma] = 0;
    }
    acc[forma] += rec.total;
    return acc;
  }, {});

  const dadosPieChart = Object.entries(recebimentosPorFormaPagamento).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <Cartao>
        <CartaoCabecalho>
          <CartaoTitulo>Recebimentos Mensais</CartaoTitulo>
        </CartaoCabecalho>
        <CartaoConteudo>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosBarChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(value: any) => formatCurrency(value)}
                labelStyle={{ color: '#000' }}
              />
              <Bar dataKey="valor" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CartaoConteudo>
      </Cartao>

      <Cartao>
        <CartaoCabecalho>
          <CartaoTitulo>Formas de Pagamento</CartaoTitulo>
        </CartaoCabecalho>
        <CartaoConteudo>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosPieChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dadosPieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}
