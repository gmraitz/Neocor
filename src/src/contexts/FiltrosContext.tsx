import { createContext, useContext, useState, ReactNode } from 'react';
import { FiltrosRecebimentos, FiltrosDashboard } from '../types';

interface FiltrosContextType {
  filtrosRecebimentos: FiltrosRecebimentos;
  setFiltrosRecebimentos: (filtros: FiltrosRecebimentos) => void;
  atualizarFiltroRecebimentos: (campo: keyof FiltrosRecebimentos, valor: any) => void;
  filtrosDashboard: FiltrosDashboard;
  setFiltrosDashboard: (filtros: FiltrosDashboard) => void;
  atualizarFiltroDashboard: (campo: keyof FiltrosDashboard, valor: any) => void;
}

const FiltrosContext = createContext<FiltrosContextType | undefined>(undefined);

export const useFiltros = () => {
  const context = useContext(FiltrosContext);
  if (!context) {
    throw new Error('useFiltros deve ser usado dentro de um FiltrosProvider');
  }
  return context;
};

interface FiltrosProviderProps {
  children: ReactNode;
}

export const FiltrosProvider = ({ children }: FiltrosProviderProps) => {
  const [filtrosRecebimentos, setFiltrosRecebimentos] = useState<FiltrosRecebimentos>({
    searchTerm: '',
    status: 'todos',
    periodo: 'mes',
    dataInicio: '',
    dataFim: '',
    instituicao: 'todos',
    formaPagamento: 'todos',
    beneficiario: '',
    executante: 'todos',
    localAtendimento: 'todos',
    prestadorArquivo: 'todos',
    codigoProcedimento: '',
  });

  const [filtrosDashboard, setFiltrosDashboard] = useState<FiltrosDashboard>({
    periodo: 'mes',
    dataInicio: '',
    dataFim: '',
    status: 'todos',
    instituicao: 'todos',
    formaPagamento: 'todos',
    executante: 'todos',
    localAtendimento: 'todos',
    nomeProcedimento: 'todos',
    conta: '',
  });

  const atualizarFiltroRecebimentos = (campo: keyof FiltrosRecebimentos, valor: any) => {
    setFiltrosRecebimentos((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const atualizarFiltroDashboard = (campo: keyof FiltrosDashboard, valor: any) => {
    setFiltrosDashboard((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  return (
    <FiltrosContext.Provider
      value={{
        filtrosRecebimentos,
        setFiltrosRecebimentos,
        atualizarFiltroRecebimentos,
        filtrosDashboard,
        setFiltrosDashboard,
        atualizarFiltroDashboard,
      }}
    >
      {children}
    </FiltrosContext.Provider>
  );
};