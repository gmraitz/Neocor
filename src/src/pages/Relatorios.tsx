import { useState } from 'react';
import { FileText, Download, Calendar, Filter, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';

export function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes-atual');
  const [tipoRelatorio, setTipoRelatorio] = useState('');

  const relatoriosDisponiveis = [
    {
      id: 'financeiro',
      titulo: 'Relatório Financeiro',
      descricao: 'Resumo completo de recebimentos e pagamentos',
      icone: DollarSign,
      cor: 'text-green-600',
      bgCor: 'bg-green-50',
    },
    {
      id: 'pacientes',
      titulo: 'Relatório de Pacientes',
      descricao: 'Análise de atendimentos por paciente',
      icone: Users,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-50',
    },
    {
      id: 'desempenho',
      titulo: 'Relatório de Desempenho',
      descricao: 'Métricas e indicadores de performance',
      icone: TrendingUp,
      cor: 'text-purple-600',
      bgCor: 'bg-purple-50',
    },
  ];

  const periodos = [
    { value: 'hoje', label: 'Hoje' },
    { value: 'semana-atual', label: 'Semana Atual' },
    { value: 'mes-atual', label: 'Mês Atual' },
    { value: 'mes-anterior', label: 'Mês Anterior' },
    { value: 'trimestre-atual', label: 'Trimestre Atual' },
    { value: 'ano-atual', label: 'Ano Atual' },
    { value: 'personalizado', label: 'Período Personalizado' },
  ];

  const handleGerarRelatorio = (relatorioId: string) => {
    setTipoRelatorio(relatorioId);
    // Simular geração de relatório
    setTimeout(() => {
      alert(`Relatório "${relatoriosDisponiveis.find(r => r.id === relatorioId)?.titulo}" gerado com sucesso!`);
      setTipoRelatorio('');
    }, 1500);
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Relatórios</h2>
          <p className="text-sm text-gray-600 mt-1">
            Gere e exporte relatórios personalizados
          </p>
        </div>
        <FileText className="h-8 w-8 text-blue-600" />
      </div>

      {/* Filtros de Período */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>
            Selecione o período para os relatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="periodo">Período</Label>
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger id="periodo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodos.map((periodo) => (
                    <SelectItem key={periodo.value} value={periodo.value}>
                      {periodo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {periodoSelecionado === 'personalizado' && (
              <>
                <div>
                  <Label htmlFor="data-inicio">Data Início</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      id="data-inicio"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="data-fim">Data Fim</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      id="data-fim"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Relatórios */}
      <div>
        <h3 className="text-gray-900 mb-4">Tipos de Relatórios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatoriosDisponiveis.map((relatorio) => {
            const Icon = relatorio.icone;
            const isGerando = tipoRelatorio === relatorio.id;

            return (
              <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${relatorio.bgCor} flex items-center justify-center mb-3`}>
                    <Icon className={`h-6 w-6 ${relatorio.cor}`} />
                  </div>
                  <CardTitle className="text-lg">{relatorio.titulo}</CardTitle>
                  <CardDescription>{relatorio.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleGerarRelatorio(relatorio.id)}
                    disabled={isGerando}
                  >
                    {isGerando ? (
                      'Gerando...'
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Gerar Relatório
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Relatórios Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Últimos relatórios gerados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Relatório Financeiro - Novembro 2024</p>
                  <p className="text-xs text-gray-500">Gerado em 05/11/2024 às 14:30</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Relatório de Pacientes - Outubro 2024</p>
                  <p className="text-xs text-gray-500">Gerado em 01/11/2024 às 09:15</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-900">Relatório de Desempenho - Outubro 2024</p>
                  <p className="text-xs text-gray-500">Gerado em 31/10/2024 às 16:45</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}