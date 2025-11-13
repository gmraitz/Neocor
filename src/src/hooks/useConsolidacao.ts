import { useState, useCallback } from 'react';
import { DadosConsolidacao } from '../components/recebimentos/DialogConsolidacao';

interface ConsolidacaoArmazenada extends DadosConsolidacao {
  id: string;
  dataRegistro: string;
}

const STORAGE_KEY = 'consolida_consolidacoes';

export function useConsolidacao() {
  const [consolidacoes, setConsolidacoes] = useState<ConsolidacaoArmazenada[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar consolidações:', error);
      return [];
    }
  });

  const salvarConsolidacao = useCallback((id: string, dados: DadosConsolidacao) => {
    const novaConsolidacao: ConsolidacaoArmazenada = {
      id,
      ...dados,
      dataRegistro: new Date().toISOString(),
    };

    setConsolidacoes((prev) => {
      // Remove consolidação anterior do mesmo recebimento se existir
      const filtradas = prev.filter((c) => c.id !== id);
      const novaLista = [...filtradas, novaConsolidacao];
      
      // Salvar no localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      } catch (error) {
        console.error('Erro ao salvar consolidação:', error);
      }
      
      return novaLista;
    });
  }, []);

  const obterConsolidacao = useCallback((id: string): ConsolidacaoArmazenada | undefined => {
    return consolidacoes.find((c) => c.id === id);
  }, [consolidacoes]);

  const excluirConsolidacao = useCallback((id: string) => {
    setConsolidacoes((prev) => {
      const novaLista = prev.filter((c) => c.id !== id);
      
      // Salvar no localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      } catch (error) {
        console.error('Erro ao excluir consolidação:', error);
      }
      
      return novaLista;
    });
  }, []);

  const obterEstatisticas = useCallback(() => {
    const total = consolidacoes.length;
    const consolidados = consolidacoes.filter((c) => c.statusConsolidacao === 'consolidado').length;
    const glosados = consolidacoes.filter((c) => c.statusConsolidacao === 'glosado').length;
    const pagosParciais = consolidacoes.filter((c) => c.statusConsolidacao === 'pago-parcial').length;
    const abertos = consolidacoes.filter((c) => c.statusConsolidacao === 'aberto').length;

    return {
      total,
      consolidados,
      glosados,
      pagosParciais,
      abertos,
      taxaConsolidacao: total > 0 ? (consolidados / total) * 100 : 0,
    };
  }, [consolidacoes]);

  return {
    consolidacoes,
    salvarConsolidacao,
    obterConsolidacao,
    excluirConsolidacao,
    obterEstatisticas,
  };
}
