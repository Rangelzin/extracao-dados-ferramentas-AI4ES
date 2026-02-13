import { Quarto, type CriarQuartoDTO } from '../domain-entities';

/**
 * Camada de abstração para chamadas à API.
 * Centraliza as configurações de infraestrutura e tratamento básico de respostas.
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const QuartoService = {
  /**
   * Obtém a lista de todos os quartos cadastrados.
   */
  async listar(): Promise<Quarto[]> {
    const res = await fetch(`${API_BASE_URL}/quartos`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Falha ao carregar quartos do servidor');
    }
    return res.json();
  },

  /**
   * Envia os dados para criação de um novo quarto.
   */
  async cadastrar(dados: CriarQuartoDTO): Promise<Quarto> {
    const res = await fetch(`${API_BASE_URL}/quartos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erro ao processar o cadastro do quarto');
    }
    return res.json();
  },

  /**
   * Atualiza informações de um quarto existente pelo número.
   */
  async editar(numero: string, dados: Partial<Quarto>): Promise<Quarto> {
    const res = await fetch(`${API_BASE_URL}/quartos/${numero}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erro ao atualizar informações do quarto');
    }
    return res.json();
  }
};
