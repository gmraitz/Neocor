import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Circle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog';
import { Botao } from '../../../components/ui/botao';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Recebimento } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface DialogConsolidacaoProps {
  recebimento: Recebimento | null;
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (id: string, dados: DadosConsolidacao) => void;
}

export interface DadosConsolidacao {
  statusConsolidacao: 'consolidado' | 'glosado' | 'pago-parcial' | 'aberto';
  valorPago?: number;
  dataConsolidacao: string;
  observacoes?: string;
}

export function DialogConsolidacao({ recebimento, aberto, onFechar, onSalvar }: DialogConsolidacaoProps) {
  const [statusSelecionado, setStatusSelecionado] = useState<'consolidado' | 'glosado' | 'pago-parcial' | 'aberto'>('aberto');
  const [valorPago, setValorPago] = useState<string>('');
  const [dataConsolidacao, setDataConsolidacao] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [observacoes, setObservacoes] = useState<string>('');

  // Atualizar estado quando o recebimento mudar
  useEffect(() => {
    if (recebimento) {
      setStatusSelecionado(recebimento.statusConsolidacao || 'aberto');
      setValorPago('');
      setDataConsolidacao(new Date().toISOString().split('T')[0]);
      setObservacoes('');
    }
  }, [recebimento]);

  if (!recebimento) return null;

  const valorLiquido = recebimento.total - recebimento.glosa;

  const handleSalvar = () => {
    const valorPagoNumero = valorPago ? parseFloat(valorPago) : undefined;
    
    onSalvar(recebimento.id, {
      statusConsolidacao: statusSelecionado,
      valorPago: valorPagoNumero,
      dataConsolidacao,
      observacoes,
    });
    
    onFechar();
  };

  const opcoesStatus = [
    {
      value: 'consolidado',
      label: 'Consolidado',
      icon: CheckCircle,
      color: '#5C9E5C',
      bgColor: 'rgba(92, 158, 92, 0.1)',
      description: 'Valor recebido conforme esperado'
    },
    {
      value: 'glosado',
      label: 'Glosado',
      icon: XCircle,
      color: '#C0504D',
      bgColor: 'rgba(192, 80, 77, 0.1)',
      description: 'Valor glosado pelo convênio'
    },
    {
      value: 'pago-parcial',
      label: 'Pago Parcial',
      icon: AlertCircle,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      description: 'Valor recebido parcialmente'
    },
    {
      value: 'aberto',
      label: 'Aberto',
      icon: Circle,
      color: '#6B7785',
      bgColor: 'rgba(107, 119, 133, 0.1)',
      description: 'Aguardando consolidação'
    },
  ];

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Consolidação de Recebimento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Recebimento */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7F8FA' }}>
            <h4 className="mb-3" style={{ color: '#333F48' }}>Dados do Recebimento</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span style={{ color: '#6B7785' }}>Guia:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{recebimento.guia}</span>
              </div>
              <div>
                <span style={{ color: '#6B7785' }}>Conta:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{recebimento.conta}</span>
              </div>
              <div>
                <span style={{ color: '#6B7785' }}>Beneficiário:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{recebimento.beneficiario}</span>
              </div>
              <div>
                <span style={{ color: '#6B7785' }}>Data Atendimento:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{formatDate(recebimento.dataAtendimento)}</span>
              </div>
              <div>
                <span style={{ color: '#6B7785' }}>Procedimento:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{recebimento.nomeProcedimento}</span>
              </div>
              <div>
                <span style={{ color: '#6B7785' }}>Executante:</span>
                <span className="ml-2" style={{ color: '#333F48' }}>{recebimento.executante}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Bruto</p>
                <p className="font-semibold" style={{ color: '#333F48' }}>
                  {formatCurrency(recebimento.total)}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Glosa</p>
                <p className="font-semibold" style={{ color: '#C0504D' }}>
                  {formatCurrency(recebimento.glosa)}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Valor Líquido</p>
                <p className="font-semibold" style={{ color: '#007AA3' }}>
                  {formatCurrency(valorLiquido)}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Pago Parcial</p>
                <p className="font-semibold" style={{ color: '#F59E0B' }}>
                  {formatCurrency(valorPago ? parseFloat(valorPago) : 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Seleção de Status */}
          <div>
            <Label className="mb-3 block">Status da Consolidação</Label>
            <div className="grid grid-cols-2 gap-3">
              {opcoesStatus.map((opcao) => {
                const Icon = opcao.icon;
                const selecionado = statusSelecionado === opcao.value;
                
                return (
                  <button
                    key={opcao.value}
                    type="button"
                    onClick={() => setStatusSelecionado(opcao.value as any)}
                    className="p-4 rounded-lg border-2 transition-all text-left"
                    style={{
                      backgroundColor: selecionado ? opcao.bgColor : '#FFFFFF',
                      borderColor: selecionado ? opcao.color : '#E5E7EB',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className="h-5 w-5 mt-0.5 flex-shrink-0"
                        style={{ color: opcao.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold mb-1" style={{ color: opcao.color }}>
                          {opcao.label}
                        </p>
                        <p className="text-xs" style={{ color: '#6B7785' }}>
                          {opcao.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Valor Pago (se pago parcial) */}
          {statusSelecionado === 'pago-parcial' && (
            <div>
              <Label htmlFor="valorPago">Valor Efetivamente Pago</Label>
              <Input
                id="valorPago"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs mt-1" style={{ color: '#6B7785' }}>
                Valor líquido esperado: {formatCurrency(valorLiquido)}
              </p>
            </div>
          )}

          {/* Data da Consolidação */}
          <div>
            <Label htmlFor="dataConsolidacao">Data da Consolidação</Label>
            <Input
              id="dataConsolidacao"
              type="date"
              value={dataConsolidacao}
              onChange={(e) => setDataConsolidacao(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Adicione observações sobre a consolidação (opcional)"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Botao variant="outline" onClick={onFechar}>
            Cancelar
          </Botao>
          <Botao onClick={handleSalvar} style={{ backgroundColor: '#007AA3' }}>
            Salvar Consolidação
          </Botao>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}