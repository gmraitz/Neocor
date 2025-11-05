import { useState } from 'react';
import { MoreVertical, Eye, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from './ui/cartao';
import { Tabela, TabelaCorpo, TabelaCelula, TabelaTitulo, TabelaCabecalho, TabelaLinha } from './ui/tabela';
import { Emblema } from './ui/emblema';
import { Botao } from './ui/botao';
import { MenuSuspenso, MenuSuspensoConteudo, MenuSuspensoItem, MenuSuspensoGatilho } from './ui/menu-suspenso';

interface Recebimento {
  id: string;
  numeroFatura: string;
  paciente: string;
  procedimento: string;
  valor: number;
  dataAtendimento: string;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'recebido' | 'pendente' | 'atrasado';
  formaPagamento?: string;
  instituicao?: string;
}

const recebimentosMock: Recebimento[] = [
  {
    id: '1',
    numeroFatura: 'FAT-2025-001',
    paciente: 'Maria Silva Santos',
    procedimento: 'Consulta Cardiologia',
    valor: 450.00,
    dataAtendimento: '2025-10-15',
    dataVencimento: '2025-10-25',
    dataPagamento: '2025-10-24',
    status: 'recebido',
    formaPagamento: 'PIX',
    instituicao: 'Banco do Brasil',
  },
  {
    id: '2',
    numeroFatura: 'FAT-2025-002',
    paciente: 'João Pedro Oliveira',
    procedimento: 'Exame de Sangue Completo',
    valor: 320.00,
    dataAtendimento: '2025-10-18',
    dataVencimento: '2025-10-28',
    dataPagamento: '2025-10-27',
    status: 'recebido',
    formaPagamento: 'Cartão de Crédito',
    instituicao: 'Sicredi',
  },
  {
    id: '3',
    numeroFatura: 'FAT-2025-003',
    paciente: 'Ana Carolina Ferreira',
    procedimento: 'Ultrassom Obstétrico',
    valor: 580.00,
    dataAtendimento: '2025-10-20',
    dataVencimento: '2025-11-05',
    status: 'pendente',
    instituicao: 'Unimed',
  },
  {
    id: '4',
    numeroFatura: 'FAT-2025-004',
    paciente: 'Carlos Eduardo Lima',
    procedimento: 'Raio-X Tórax',
    valor: 280.00,
    dataAtendimento: '2025-10-22',
    dataVencimento: '2025-11-01',
    status: 'atrasado',
    instituicao: 'Caixa',
  },
  {
    id: '5',
    numeroFatura: 'FAT-2025-005',
    paciente: 'Beatriz Costa Almeida',
    procedimento: 'Consulta Dermatologia',
    valor: 400.00,
    dataAtendimento: '2025-10-25',
    dataVencimento: '2025-11-04',
    status: 'pendente',
    instituicao: 'Polisaude',
  },
  {
    id: '6',
    numeroFatura: 'FAT-2025-006',
    paciente: 'Ricardo Souza Martins',
    procedimento: 'Tomografia Computadorizada',
    valor: 1200.00,
    dataAtendimento: '2025-10-28',
    dataVencimento: '2025-11-07',
    dataPagamento: '2025-11-02',
    status: 'recebido',
    formaPagamento: 'Convênio',
    instituicao: 'Unimed',
  },
  {
    id: '7',
    numeroFatura: 'FAT-2025-007',
    paciente: 'Fernanda Rodrigues',
    procedimento: 'Consulta Ortopedia',
    valor: 520.00,
    dataAtendimento: '2025-10-30',
    dataVencimento: '2025-11-09',
    status: 'pendente',
    instituicao: 'Banco do Brasil',
  },
  {
    id: '8',
    numeroFatura: 'FAT-2025-008',
    paciente: 'Paulo Henrique Santos',
    procedimento: 'Eletrocardiograma',
    valor: 180.00,
    dataAtendimento: '2025-11-01',
    dataVencimento: '2025-10-28',
    status: 'atrasado',
    instituicao: 'Sicredi',
  },
];

interface TabelaRecebimentosProps {
  filters: {
    searchTerm: string;
    status: string;
    periodo: string;
    convenio?: string;
    formaPagamento?: string;
    procedimento?: string;
    dataInicio?: string;
    dataFim?: string;
  };
}

export function TabelaRecebimentos({ filters }: TabelaRecebimentosProps) {
  const filteredRecebimentos = recebimentosMock.filter((rec) => {
    const matchesSearch = 
      rec.paciente.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      rec.numeroFatura.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      rec.procedimento.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'todos' || rec.status === filters.status;
    
    const matchesFormaPagamento = 
      !filters.formaPagamento || 
      filters.formaPagamento === 'todos' || 
      rec.formaPagamento?.toLowerCase().includes(filters.formaPagamento.toLowerCase());

    return matchesSearch && matchesStatus && matchesFormaPagamento;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recebido':
        return (
          <Emblema className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
            <CheckCircle className="h-3 w-3" />
            Recebido
          </Emblema>
        );
      case 'pendente':
        return (
          <Emblema className="bg-blue-100 text-blue-700 hover:bg-blue-100 gap-1">
            <Clock className="h-3 w-3" />
            Pendente
          </Emblema>
        );
      case 'atrasado':
        return (
          <Emblema className="bg-red-100 text-red-700 hover:bg-red-100 gap-1">
            <AlertCircle className="h-3 w-3" />
            Atrasado
          </Emblema>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Cartao>
      <CartaoCabecalho>
        <CartaoTitulo>Recebimentos Recentes</CartaoTitulo>
      </CartaoCabecalho>
      <CartaoConteudo>
        <div className="overflow-x-auto">
          <Tabela>
            <TabelaCabecalho>
              <TabelaLinha>
                <TabelaTitulo>Fatura</TabelaTitulo>
                <TabelaTitulo>Paciente</TabelaTitulo>
                <TabelaTitulo>Procedimento</TabelaTitulo>
                <TabelaTitulo>Atendimento</TabelaTitulo>
                <TabelaTitulo>Vencimento</TabelaTitulo>
                <TabelaTitulo>Valor</TabelaTitulo>
                <TabelaTitulo>Status</TabelaTitulo>
                <TabelaTitulo>Pagamento</TabelaTitulo>
                <TabelaTitulo>Banco/Convênio</TabelaTitulo>
                <TabelaTitulo className="text-right">Ações</TabelaTitulo>
              </TabelaLinha>
            </TabelaCabecalho>
            <TabelaCorpo>
              {filteredRecebimentos.map((recebimento) => (
                <TabelaLinha key={recebimento.id}>
                  <TabelaCelula>{recebimento.numeroFatura}</TabelaCelula>
                  <TabelaCelula>{recebimento.paciente}</TabelaCelula>
                  <TabelaCelula>{recebimento.procedimento}</TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {formatDate(recebimento.dataAtendimento)}
                  </TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {formatDate(recebimento.dataVencimento)}
                  </TabelaCelula>
                  <TabelaCelula>{formatCurrency(recebimento.valor)}</TabelaCelula>
                  <TabelaCelula>{getStatusBadge(recebimento.status)}</TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {recebimento.formaPagamento || '-'}
                  </TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {recebimento.instituicao || '-'}
                  </TabelaCelula>
                  <TabelaCelula className="text-right">
                    <MenuSuspenso>
                      <MenuSuspensoGatilho asChild>
                        <Botao variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Botao>
                      </MenuSuspensoGatilho>
                      <MenuSuspensoConteudo align="end">
                        <MenuSuspensoItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver detalhes
                        </MenuSuspensoItem>
                        <MenuSuspensoItem className="gap-2">
                          <Download className="h-4 w-4" />
                          Baixar recibo
                        </MenuSuspensoItem>
                      </MenuSuspensoConteudo>
                    </MenuSuspenso>
                  </TabelaCelula>
                </TabelaLinha>
              ))}
            </TabelaCorpo>
          </Tabela>
        </div>

        {filteredRecebimentos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum recebimento encontrado com os filtros aplicados.
          </div>
        )}
      </CartaoConteudo>
    </Cartao>
  );
}
