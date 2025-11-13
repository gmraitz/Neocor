import { useState } from 'react';
import { MoreVertical, Eye, Download, Circle, FileCheck } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { Tabela, TabelaCorpo, TabelaCelula, TabelaTitulo, TabelaCabecalho, TabelaLinha } from '../../../components/ui/tabela';
import { Botao } from '../../../components/ui/botao';
import { MenuSuspenso, MenuSuspensoConteudo, MenuSuspensoItem, MenuSuspensoGatilho } from '../../../components/ui/menu-suspenso';
import { Recebimento } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { DialogConsolidacao, DadosConsolidacao } from './DialogConsolidacao';

interface TabelaRecebimentosProps {
  recebimentos: Recebimento[];
  onAtualizarConsolidacao?: (id: string, dados: DadosConsolidacao) => void;
}

export function TabelaRecebimentos({ recebimentos, onAtualizarConsolidacao }: TabelaRecebimentosProps) {
  const [recebimentoSelecionado, setRecebimentoSelecionado] = useState<Recebimento | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);

  const abrirDialogConsolidacao = (recebimento: Recebimento) => {
    setRecebimentoSelecionado(recebimento);
    setDialogAberto(true);
  };

  const fecharDialog = () => {
    setDialogAberto(false);
    setRecebimentoSelecionado(null);
  };

  const handleSalvarConsolidacao = (id: string, dados: DadosConsolidacao) => {
    if (onAtualizarConsolidacao) {
      onAtualizarConsolidacao(id, dados);
    }
  };

  const getStatusConsolidacao = (statusConsolidacao?: string) => {
    switch (statusConsolidacao) {
      case 'consolidado':
        return (
          <div className="flex items-center gap-1" style={{ color: '#5C9E5C' }}>
            <Circle className="h-3 w-3 fill-current" />
            <span className="text-xs">Consolidado</span>
          </div>
        );
      case 'glosado':
        return (
          <div className="flex items-center gap-1" style={{ color: '#6B7785' }}>
            <Circle className="h-3 w-3 fill-current" />
            <span className="text-xs">Glosado</span>
          </div>
        );
      case 'pago-parcial':
        return (
          <div className="flex items-center gap-1" style={{ color: '#D97706' }}>
            <Circle className="h-3 w-3 fill-current" />
            <span className="text-xs">Pago Parcial</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1" style={{ color: '#6B7785' }}>
            <Circle className="h-3 w-3 fill-current" />
            <span className="text-xs">Aberto</span>
          </div>
        );
    }
  };

  // Calcular totais
  const totais = recebimentos.reduce(
    (acc, rec) => ({
      quantidade: acc.quantidade + 1,
      custo: acc.custo + rec.custo,
      honorario: acc.honorario + rec.honorario,
      glosa: acc.glosa + rec.glosa,
      total: acc.total + rec.total,
      liquido: acc.liquido + (rec.total - rec.glosa),
      consolidado: acc.consolidado + (rec.statusConsolidacao === 'consolidado' ? (rec.total - rec.glosa) : 0),
      aberto: acc.aberto + (!rec.statusConsolidacao || rec.statusConsolidacao === 'aberto' ? (rec.total - rec.glosa) : 0),
      recebidoParcial: acc.recebidoParcial + (rec.statusConsolidacao === 'pago-parcial' && rec.valorPagoParcial ? rec.valorPagoParcial : 0),
    }),
    { quantidade: 0, custo: 0, honorario: 0, glosa: 0, total: 0, liquido: 0, consolidado: 0, aberto: 0, recebidoParcial: 0 }
  );

  return (
    <Cartao>
      <CartaoCabecalho>
        <div>
          <CartaoTitulo>Recebimentos e Consolidação</CartaoTitulo>
          <p className="text-sm" style={{ color: '#6B7785' }}>
            {recebimentos.length} registro(s) encontrado(s)
          </p>
        </div>
      </CartaoCabecalho>
      <CartaoConteudo>
        <div className="overflow-x-auto">
          <Tabela>
            <TabelaCabecalho>
              <TabelaLinha>
                <TabelaTitulo>Guia</TabelaTitulo>
                <TabelaTitulo>Conta</TabelaTitulo>
                <TabelaTitulo>Código</TabelaTitulo>
                <TabelaTitulo>Beneficiário</TabelaTitulo>
                <TabelaTitulo>Data Atendimento</TabelaTitulo>
                <TabelaTitulo>Procedimento</TabelaTitulo>
                <TabelaTitulo>Função</TabelaTitulo>
                <TabelaTitulo className="text-center">Qtd</TabelaTitulo>
                <TabelaTitulo>Custo</TabelaTitulo>
                <TabelaTitulo>Honorário</TabelaTitulo>
                <TabelaTitulo>Glosa</TabelaTitulo>
                <TabelaTitulo>Cód. Glosa</TabelaTitulo>
                <TabelaTitulo>Total</TabelaTitulo>
                <TabelaTitulo>Valor Líquido</TabelaTitulo>
                <TabelaTitulo>Recebido Parcial</TabelaTitulo>
                <TabelaTitulo>Consolidação</TabelaTitulo>
                <TabelaTitulo>Executante</TabelaTitulo>
                <TabelaTitulo>Local</TabelaTitulo>
                <TabelaTitulo className="text-right">Ações</TabelaTitulo>
              </TabelaLinha>
            </TabelaCabecalho>
            <TabelaCorpo>
              {recebimentos.map((recebimento) => {
                const valorLiquido = recebimento.total - recebimento.glosa;
                return (
                  <TabelaLinha key={recebimento.id}>
                    <TabelaCelula>{recebimento.guia}</TabelaCelula>
                    <TabelaCelula>{recebimento.conta}</TabelaCelula>
                    <TabelaCelula>{recebimento.codigo}</TabelaCelula>
                    <TabelaCelula className="max-w-xs truncate" title={recebimento.beneficiario}>
                      {recebimento.beneficiario}
                    </TabelaCelula>
                    <TabelaCelula style={{ color: '#6B7785' }}>
                      {formatDate(recebimento.dataAtendimento)}
                    </TabelaCelula>
                    <TabelaCelula className="max-w-xs truncate" title={recebimento.nomeProcedimento}>
                      {recebimento.nomeProcedimento}
                    </TabelaCelula>
                    <TabelaCelula>{recebimento.funcao}</TabelaCelula>
                    <TabelaCelula className="text-center">{recebimento.quantidade}</TabelaCelula>
                    <TabelaCelula>{formatCurrency(recebimento.custo)}</TabelaCelula>
                    <TabelaCelula>{formatCurrency(recebimento.honorario)}</TabelaCelula>
                    <TabelaCelula>
                      {formatCurrency(recebimento.glosa)}
                    </TabelaCelula>
                    <TabelaCelula style={{ color: '#6B7785' }}>
                      {recebimento.codGlosa || '-'}
                    </TabelaCelula>
                    <TabelaCelula>{formatCurrency(recebimento.total)}</TabelaCelula>
                    <TabelaCelula className="font-semibold" style={{ color: '#007AA3' }}>
                      {formatCurrency(valorLiquido)}
                    </TabelaCelula>
                    <TabelaCelula className="font-semibold" style={{ color: '#D97706' }}>
                      {formatCurrency(recebimento.valorPagoParcial || 0)}
                    </TabelaCelula>
                    <TabelaCelula>{getStatusConsolidacao(recebimento.statusConsolidacao)}</TabelaCelula>
                    <TabelaCelula className="max-w-xs truncate" title={recebimento.executante}>
                      {recebimento.executante}
                    </TabelaCelula>
                    <TabelaCelula className="max-w-xs truncate" title={recebimento.localAtendimento}>
                      {recebimento.localAtendimento}
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
                            Baixar comprovante
                          </MenuSuspensoItem>
                          <MenuSuspensoItem className="gap-2" onClick={() => abrirDialogConsolidacao(recebimento)}>
                            <FileCheck className="h-4 w-4" />
                            Consolidar
                          </MenuSuspensoItem>
                        </MenuSuspensoConteudo>
                      </MenuSuspenso>
                    </TabelaCelula>
                  </TabelaLinha>
                );
              })}
            </TabelaCorpo>
          </Tabela>
        </div>

        {recebimentos.length === 0 && (
          <div className="text-center py-12" style={{ color: '#6B7785' }}>
            Nenhum recebimento encontrado com os filtros aplicados.
          </div>
        )}

        {/* Totalizadores */}
        {recebimentos.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBEFF3' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Registros</p>
                <p className="text-xl font-semibold" style={{ color: '#333F48' }}>
                  {totais.quantidade}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBEFF3' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Custo</p>
                <p className="text-xl font-semibold" style={{ color: '#333F48' }}>
                  {formatCurrency(totais.custo)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBEFF3' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Honorário</p>
                <p className="text-xl font-semibold" style={{ color: '#333F48' }}>
                  {formatCurrency(totais.honorario)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBEFF3' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Glosado</p>
                <p className="text-xl font-semibold" style={{ color: '#333F48' }}>
                  {formatCurrency(totais.glosa)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#EBEFF3' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Bruto</p>
                <p className="text-xl font-semibold" style={{ color: '#333F48' }}>
                  {formatCurrency(totais.total)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 122, 163, 0.1)' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Total Líquido</p>
                <p className="text-xl font-semibold" style={{ color: '#007AA3' }}>
                  {formatCurrency(totais.liquido)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(92, 158, 92, 0.1)' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Consolidado</p>
                <p className="text-xl font-semibold" style={{ color: '#5C9E5C' }}>
                  {formatCurrency(totais.consolidado)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(192, 80, 77, 0.1)' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Em Aberto</p>
                <p className="text-xl font-semibold" style={{ color: '#C0504D' }}>
                  {formatCurrency(totais.aberto)}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)' }}>
                <p className="text-xs mb-1" style={{ color: '#6B7785' }}>Recebido Parcial</p>
                <p className="text-xl font-semibold" style={{ color: '#D97706' }}>
                  {formatCurrency(totais.recebidoParcial)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CartaoConteudo>

      {/* Dialog de Consolidação */}
      <DialogConsolidacao
        recebimento={recebimentoSelecionado}
        aberto={dialogAberto}
        onFechar={fecharDialog}
        onSalvar={handleSalvarConsolidacao}
      />
    </Cartao>
  );
}