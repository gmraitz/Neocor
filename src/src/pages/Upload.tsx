import { useState, useRef } from 'react';
import { Upload as UploadIcon, FileSpreadsheet, X, CheckCircle, AlertCircle, Clock, FileCheck } from 'lucide-react';
import { Cartao, CartaoConteudo, CartaoCabecalho, CartaoTitulo, CartaoDescricao } from '../../components/ui/cartao';
import { Selecao, SelecaoConteudo, SelecaoItem, SelecaoGatilho, SelecaoValor } from '../../components/ui/selecao';
import { Botao } from '../../components/ui/botao';
import { toast } from 'sonner@2.0.3';

interface HistoricoUpload {
  id: string;
  nomeArquivo: string;
  convenio: string;
  dataUpload: Date;
  registros: number;
  status: 'sucesso' | 'processando' | 'erro';
}

export function Upload() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [convenio, setConvenio] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [historico, setHistorico] = useState<HistoricoUpload[]>([
    {
      id: '1',
      nomeArquivo: 'recebimentos_unimed_nov2024.xlsx',
      convenio: 'Unimed',
      dataUpload: new Date('2024-11-10'),
      registros: 1250,
      status: 'sucesso',
    },
    {
      id: '2',
      nomeArquivo: 'planilha_polisaude_out2024.xlsx',
      convenio: 'Polisaúde',
      dataUpload: new Date('2024-11-05'),
      registros: 890,
      status: 'sucesso',
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convenios = [
    { value: 'polisaude', label: 'Polisaúde' },
    { value: 'unimed', label: 'Unimed' },
    { value: 'sus', label: 'SUS' },
    { value: 'particular', label: 'Particular' },
    { value: 'amil', label: 'Amil' },
    { value: 'bradesco', label: 'Bradesco Saúde' },
    { value: 'sulamerica', label: 'SulAmérica' },
    { value: 'notredame', label: 'NotreDame Intermédica' },
    { value: 'hapvida', label: 'Hapvida' },
    { value: 'outros', label: 'Outros' },
  ];

  const handleFileSelect = (file: File) => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!validTypes.includes(file.type)) {
      toast.error('Formato inválido. Use arquivos .xlsx, .xls ou .csv');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error('Arquivo muito grande. Tamanho máximo: 10MB');
      return;
    }

    setArquivo(file);
    toast.success('Arquivo selecionado com sucesso!');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!arquivo) {
      toast.error('Selecione um arquivo');
      return;
    }

    if (!convenio) {
      toast.error('Selecione o convênio de origem');
      return;
    }

    setUploading(true);

    // Simular upload - aqui você faria a integração com o backend
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const convenioLabel = convenios.find(c => c.value === convenio)?.label || '';
      
      // Adicionar ao histórico
      const novoUpload: HistoricoUpload = {
        id: Date.now().toString(),
        nomeArquivo: arquivo.name,
        convenio: convenioLabel,
        dataUpload: new Date(),
        registros: Math.floor(Math.random() * 1000) + 500,
        status: 'sucesso',
      };
      
      setHistorico([novoUpload, ...historico]);
      
      toast.success(`Planilha do convênio ${convenioLabel} processada com sucesso!`);
      
      // Limpar após sucesso
      setArquivo(null);
      setConvenio('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Erro ao processar planilha');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setArquivo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = (status: HistoricoUpload['status']) => {
    switch (status) {
      case 'sucesso':
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Sucesso</span>
          </div>
        );
      case 'processando':
        return (
          <div className="flex items-center gap-1 text-blue-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Processando</span>
          </div>
        );
      case 'erro':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Erro</span>
          </div>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="px-4 md:px-6 py-6">
      <div className="mb-6">
        <h2 className="mb-2">Upload de Planilhas</h2>
        <p className="text-gray-600">Importe planilhas de recebimentos dos convênios</p>
      </div>

      {/* Card de Upload */}
      <Cartao className="mb-6">
        <CartaoCabecalho>
          <div>
            <CartaoTitulo>Nova Importação</CartaoTitulo>
            <CartaoDescricao>
              Selecione a planilha e o convênio de origem
            </CartaoDescricao>
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área de Upload */}
            <div className="lg:col-span-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleInputChange}
                className="hidden"
                id="file-upload"
              />
              
              {!arquivo ? (
                <label
                  htmlFor="file-upload"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    flex flex-col items-center justify-center
                    border-2 border-dashed rounded-lg
                    p-12 cursor-pointer
                    transition-all duration-200
                    ${isDragging 
                      ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                >
                  <UploadIcon className={`h-16 w-16 mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-gray-700 mb-2">
                    Arraste e solte o arquivo aqui
                  </p>
                  <p className="text-sm text-gray-500 mb-4">ou clique para selecionar</p>
                  <div className="bg-white rounded-lg px-4 py-2 border border-gray-200">
                    <p className="text-xs text-gray-600">
                      Formatos aceitos: <span className="text-gray-900">.xlsx, .xls, .csv</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Tamanho máximo: <span className="text-gray-900">10MB</span>
                    </p>
                  </div>
                </label>
              ) : (
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <FileSpreadsheet className="h-12 w-12 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate mb-1">
                          {arquivo.name}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {(arquivo.size / 1024).toFixed(2)} KB
                        </p>
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>Arquivo pronto para upload</span>
                        </div>
                      </div>
                    </div>
                    <Botao
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="flex-shrink-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </Botao>
                  </div>
                </div>
              )}
            </div>

            {/* Seleção de Convênio e Ação */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Convênio de Origem *
                </label>
                <Selecao value={convenio} onValueChange={setConvenio}>
                  <SelecaoGatilho>
                    <SelecaoValor placeholder="Selecione o convênio" />
                  </SelecaoGatilho>
                  <SelecaoConteudo>
                    {convenios.map((conv) => (
                      <SelecaoItem key={conv.value} value={conv.value}>
                        {conv.label}
                      </SelecaoItem>
                    ))}
                  </SelecaoConteudo>
                </Selecao>
                <p className="text-xs text-gray-500 mt-1.5">
                  Informe de qual convênio é a planilha
                </p>
              </div>

              <Botao
                onClick={handleUpload}
                disabled={!arquivo || !convenio || uploading}
                className="w-full h-11"
                size="lg"
              >
                {uploading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </>
                )}
              </Botao>

              {arquivo && convenio && !uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-700">
                      <p>O arquivo será processado e os dados serão importados automaticamente para o sistema.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CartaoConteudo>
      </Cartao>

      {/* Histórico de Uploads */}
      <Cartao>
        <CartaoCabecalho>
          <div className="flex items-center justify-between">
            <div>
              <CartaoTitulo>Histórico de Importações</CartaoTitulo>
              <CartaoDescricao>
                Últimas planilhas processadas
              </CartaoDescricao>
            </div>
            <FileCheck className="h-5 w-5 text-gray-400" />
          </div>
        </CartaoCabecalho>
        <CartaoConteudo>
          {historico.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhuma importação realizada ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historico.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <FileSpreadsheet className="h-10 w-10 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate mb-1">
                        {item.nomeArquivo}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{item.convenio}</span>
                        <span>•</span>
                        <span>{item.registros} registros</span>
                        <span>•</span>
                        <span>{formatDate(item.dataUpload)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}
