import { useState, useEffect, useCallback } from 'react';
import { QuartoService } from '../services/api';
import { Quarto } from '../domain-entities';

/**
 * Hook customizado para gerenciar o estado dos quartos com tipagem forte.
 * Abstrai a lógica de carregamento, erro e sincronização de dados.
 */
export const useQuartos = () => {
  const [quartos, setQuartos] = useState<Quarto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função para buscar quartos da API.
   * Memorizada com useCallback para evitar re-execuções desnecessárias.
   */
  const fetchQuartos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await QuartoService.listar();
      setQuartos(data);
      setError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Erro desconhecido ao carregar quartos';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Função para cadastrar novo quarto e atualizar a lista local.
   */
  const cadastrarQuarto = async (dados: any) => {
    try {
      await QuartoService.cadastrar(dados);
      await fetchQuartos();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Erro ao cadastrar quarto';
      setError(errorMessage);
      throw e;
    }
  };

  // Efeito inicial para carregar os dados ao montar o componente
  useEffect(() => {
    fetchQuartos();
  }, [fetchQuartos]);

  return { 
    quartos, 
    loading, 
    error, 
    cadastrarQuarto, 
    refresh: fetchQuartos 
  };
};
