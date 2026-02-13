import { useState, useEffect, useCallback } from 'react';
import { QuartoService } from '../services/api';

export const useQuartos = () => {
  const [quartos, setQuartos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuartos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await QuartoService.listar();
      setQuartos(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const cadastrarQuarto = async (dados: any) => {
    try {
      await QuartoService.cadastrar(dados);
      await fetchQuartos();
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  useEffect(() => {
    fetchQuartos();
  }, [fetchQuartos]);

  return { quartos, loading, error, cadastrarQuarto, refresh: fetchQuartos };
};
