import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo, CartaoDescricao } from '../../../components/ui/cartao';
import { Recebimento } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface GraficosProps {
  recebimentos: Recebimento[];
}

export function Graficos({ recebimentos }: GraficosProps) {
  // Dados para gráfico de recebimentos mensais (últimos 6 meses)
  const hoje = new Date();
  const ultimosSeisMeses = Array.from({ length: 6 }, (_, i) => {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() - (5 - i), 1);
    return {
      mes: data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
      mesCompleto: data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      consolidado: 0,
      paraConsolidar: 0,
    };
  });

  recebimentos.forEach((rec) => {
    const dataRec = new Date(rec.dataAtendimento);
    const mesRec = dataRec.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    const encontrado = ultimosSeisMeses.find(m => m.mes === mesRec);
    if (encontrado) {
      // Se o status de consolidação for 'consolidado' ou 'pago-parcial', conta como consolidado
      if (rec.statusConsolidacao === 'consolidado' || rec.statusConsolidacao === 'pago-parcial') {
        encontrado.consolidado += rec.total;
      } else {
        // Caso contrário (aberto, glosado, etc), conta como para consolidar
        encontrado.paraConsolidar += rec.total;
      }
    }
  });

  // Dados para gráfico de planos de saúde
  const recebimentosPorPlano = recebimentos.reduce((acc: any, rec) => {
    const plano = rec.plano || 'Não definido';
    if (!acc[plano]) {
      acc[plano] = 0;
    }
    acc[plano] += rec.total;
    return acc;
  }, {});

  const dadosPlanos = Object.entries(recebimentosPorPlano)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => (b.value as number) - (a.value as number))
    .slice(0, 6);

  // Dados para gráfico de locais de atendimento
  const recebimentosPorLocal = recebimentos.reduce((acc: any, rec) => {
    const local = rec.localAtendimento || 'Não definido';
    if (!acc[local]) {
      acc[local] = 0;
    }
    acc[local] += rec.total;
    return acc;
  }, {});

  const dadosLocais = Object.entries(recebimentosPorLocal)
    .map(([name, value]) => ({ 
      name: name.replace('Clínica NEOCOR - ', '').replace('Hospital NEOCOR', 'Hospital'),
      value 
    }))
    .sort((a, b) => (b.value as number) - (a.value as number));

  // Dados para gráfico de tipos de função
  const recebimentosPorFuncao = recebimentos.reduce((acc: any, rec) => {
    const funcao = rec.funcao || 'Não definido';
    if (!acc[funcao]) {
      acc[funcao] = 0;
    }
    acc[funcao] += rec.total;
    return acc;
  }, {});

  const dadosFuncoes = Object.entries(recebimentosPorFuncao)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => (b.value as number) - (a.value as number));

  // Paleta de cores profissional - tons sóbrios de azul/ciano e verde
  const COLORS = ['#007AA3', '#4AB3D1', '#5C9E5C', '#6B7785', '#89B5C9', '#7AB8A0', '#9DABB7', '#A8C5D6'];

  return (
    <div className="space-y-6">
      {/* Gráfico Principal - Evolução Mensal */}
      <Cartao>
        <CartaoCabecalho>
          <div>
            <CartaoTitulo>Evolução de Recebimentos</CartaoTitulo>
            <CartaoDescricao>Comparativo dos últimos 6 meses</CartaoDescricao>
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={ultimosSeisMeses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBEFF3" />
              <XAxis 
                dataKey="mes" 
                tick={{ fontSize: 12, fill: '#6B7785' }}
                stroke="#EBEFF3"
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7785' }}
                stroke="#EBEFF3"
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: any) => formatCurrency(value)}
                labelFormatter={(label) => {
                  const item = ultimosSeisMeses.find(m => m.mes === label);
                  return item?.mesCompleto || label;
                }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #EBEFF3',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  backgroundColor: '#FFFFFF',
                  color: '#333F48'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="consolidado" 
                name="Consolidado"
                stroke="#007AA3" 
                strokeWidth={3}
                dot={{ fill: '#007AA3', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="paraConsolidar" 
                name="Para Consolidar"
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </CartaoConteudo>
      </Cartao>

      {/* Gráficos Secundários */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Distribuição por Plano de Saúde */}
        <Cartao>
          <CartaoCabecalho>
            <div>
              <CartaoTitulo>Receita por Plano de Saúde</CartaoTitulo>
              <CartaoDescricao>Principais convênios</CartaoDescricao>
            </div>
          </CartaoCabecalho>
          <CartaoConteudo>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={dadosPlanos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {dadosPlanos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value)}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #EBEFF3',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    backgroundColor: '#FFFFFF',
                    color: '#333F48'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CartaoConteudo>
        </Cartao>

        {/* Local de Atendimento */}
        <Cartao>
          <CartaoCabecalho>
            <div>
              <CartaoTitulo>Receita por Local</CartaoTitulo>
              <CartaoDescricao>Distribuição por unidade</CartaoDescricao>
            </div>
          </CartaoCabecalho>
          <CartaoConteudo>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart 
                data={dadosLocais}
                margin={{ left: 10, right: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EBEFF3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: '#6B7785' }}
                  stroke="#EBEFF3"
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#6B7785' }}
                  stroke="#EBEFF3"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value)}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #EBEFF3',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    backgroundColor: '#FFFFFF',
                    color: '#333F48'
                  }}
                />
                <Bar dataKey="value" fill="#007AA3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CartaoConteudo>
        </Cartao>
      </div>

      {/* Gráfico de Tipos de Função */}
      <Cartao>
        <CartaoCabecalho>
          <div>
            <CartaoTitulo>Receita por Tipo de Serviço</CartaoTitulo>
            <CartaoDescricao>Distribuição por categoria</CartaoDescricao>
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart 
              data={dadosFuncoes}
              layout="vertical"
              margin={{ left: 100, right: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EBEFF3" />
              <XAxis 
                type="number"
                tick={{ fontSize: 11, fill: '#6B7785' }}
                stroke="#EBEFF3"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#6B7785' }}
                stroke="#EBEFF3"
              />
              <Tooltip
                formatter={(value: any) => formatCurrency(value)}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #EBEFF3',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  backgroundColor: '#FFFFFF',
                  color: '#333F48'
                }}
              />
              <Bar dataKey="value" fill="#4AB3D1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}