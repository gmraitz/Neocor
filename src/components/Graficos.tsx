import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from './ui/cartao';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { mes: 'Mai', recebido: 98000, previsto: 95000 },
  { mes: 'Jun', recebido: 105000, previsto: 100000 },
  { mes: 'Jul', recebido: 112000, previsto: 110000 },
  { mes: 'Ago', recebido: 118000, previsto: 115000 },
  { mes: 'Set', recebido: 121000, previsto: 120000 },
  { mes: 'Out', recebido: 127450, previsto: 125000 },
];

const paymentMethodsData = [
  { name: 'Cartão de Crédito', value: 45, color: '#3b82f6' },
  { name: 'PIX', value: 30, color: '#10b981' },
  { name: 'Convênio', value: 20, color: '#f59e0b' },
  { name: 'Dinheiro', value: 5, color: '#6366f1' },
];

export function Graficos() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Cartao className="lg:col-span-2">
        <CartaoCabecalho>
          <CartaoTitulo>Recebimentos Mensais</CartaoTitulo>
        </CartaoCabecalho>
        <CartaoConteudo>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="recebido" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Recebido"
              />
              <Line 
                type="monotone" 
                dataKey="previsto" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Previsto"
              />
            </LineChart>
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
                data={paymentMethodsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}
