import { MoreVertical, Eye, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo } from '../../../components/ui/cartao';
import { Tabela, TabelaCorpo, TabelaCelula, TabelaTitulo, TabelaCabecalho, TabelaLinha } from '../../../components/ui/tabela';
import { Emblema } from '../../../components/ui/emblema';
import { Botao } from '../../../components/ui/botao';
import { MenuSuspenso, MenuSuspensoConteudo, MenuSuspensoItem, MenuSuspensoGatilho } from '../../../components/ui/menu-suspenso';
import { Recebimento } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface TabelaRecebimentosProps {
  recebimentos: Recebimento[];
}

export function TabelaRecebimentos({ recebimentos }: TabelaRecebimentosProps) {
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

  return (
    <Cartao>
      <CartaoCabecalho>
        <CartaoTitulo>Recebimentos</CartaoTitulo>
        <p className="text-sm text-gray-600">{recebimentos.length} registro(s) encontrado(s)</p>
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
                <TabelaTitulo>Cód. Procedimento</TabelaTitulo>
                <TabelaTitulo>Nome Procedimento</TabelaTitulo>
                <TabelaTitulo>Função</TabelaTitulo>
                <TabelaTitulo>Qtd</TabelaTitulo>
                <TabelaTitulo>Custo</TabelaTitulo>
                <TabelaTitulo>Filme</TabelaTitulo>
                <TabelaTitulo>Honorário</TabelaTitulo>
                <TabelaTitulo>Glosa</TabelaTitulo>
                <TabelaTitulo>Cód. Glosa</TabelaTitulo>
                <TabelaTitulo>Total</TabelaTitulo>
                <TabelaTitulo>Executante</TabelaTitulo>
                <TabelaTitulo>Local Atendimento</TabelaTitulo>
                <TabelaTitulo>Prestador Arquivo</TabelaTitulo>
                <TabelaTitulo className="text-right">Ações</TabelaTitulo>
              </TabelaLinha>
            </TabelaCabecalho>
            <TabelaCorpo>
              {recebimentos.map((recebimento) => (
                <TabelaLinha key={recebimento.id}>
                  <TabelaCelula>{recebimento.guia}</TabelaCelula>
                  <TabelaCelula>{recebimento.conta}</TabelaCelula>
                  <TabelaCelula>{recebimento.codigo}</TabelaCelula>
                  <TabelaCelula>{recebimento.beneficiario}</TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {formatDate(recebimento.dataAtendimento)}
                  </TabelaCelula>
                  <TabelaCelula>{recebimento.codigoProcedimento}</TabelaCelula>
                  <TabelaCelula>{recebimento.nomeProcedimento}</TabelaCelula>
                  <TabelaCelula>{recebimento.funcao}</TabelaCelula>
                  <TabelaCelula className="text-center">{recebimento.quantidade}</TabelaCelula>
                  <TabelaCelula>{formatCurrency(recebimento.custo)}</TabelaCelula>
                  <TabelaCelula>{formatCurrency(recebimento.filme)}</TabelaCelula>
                  <TabelaCelula>{formatCurrency(recebimento.honorario)}</TabelaCelula>
                  <TabelaCelula className={recebimento.glosa > 0 ? 'text-red-600' : ''}>
                    {formatCurrency(recebimento.glosa)}
                  </TabelaCelula>
                  <TabelaCelula className="text-gray-600">
                    {recebimento.codGlosa || '-'}
                  </TabelaCelula>
                  <TabelaCelula>{formatCurrency(recebimento.total)}</TabelaCelula>
                  <TabelaCelula>{recebimento.executante}</TabelaCelula>
                  <TabelaCelula className="max-w-xs truncate" title={recebimento.localAtendimento}>
                    {recebimento.localAtendimento}
                  </TabelaCelula>
                  <TabelaCelula>{recebimento.prestadorArquivo}</TabelaCelula>
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
                      </MenuSuspensoConteudo>
                    </MenuSuspenso>
                  </TabelaCelula>
                </TabelaLinha>
              ))}
            </TabelaCorpo>
          </Tabela>
        </div>

        {recebimentos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum recebimento encontrado com os filtros aplicados.
          </div>
        )}
      </CartaoConteudo>
    </Cartao>
  );
}
