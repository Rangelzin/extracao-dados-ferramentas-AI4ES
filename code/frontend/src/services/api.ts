import { Quarto } from '../domain-entities';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const QuartoService = {
  async listar(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/quartos`);
    if (!res.ok) throw new Error('Falha ao carregar quartos');
    return res.json();
  },

  async cadastrar(dados: any): Promise<Quarto> {
    const res = await fetch(`${API_BASE_URL}/quartos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error('Erro ao cadastrar quarto');
    return res.json();
  },

  async editar(numero: string, dados: Partial<Quarto>): Promise<Quarto> {
    const res = await fetch(`${API_BASE_URL}/quartos/${numero}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error('Erro ao editar quarto');
    return res.json();
  }
};
