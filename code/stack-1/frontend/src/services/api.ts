import { type Quarto, TipoQuarto, StatusQuarto, TipoCama, type CreateQuartoInput } from '../types';

// Mock Data
let quartos: Quarto[] = [
  {
    id: '1',
    numero: '101',
    capacidade: 2,
    tipo: TipoQuarto.BASICO,
    precoDiaria: 150.00,
    status: StatusQuarto.LIVRE,
    camas: [{ tipo: TipoCama.SOLTEIRO, quantidade: 2 }],
    comodidades: []
  },
  {
    id: '2',
    numero: '201',
    capacidade: 2,
    tipo: TipoQuarto.MODERNO,
    precoDiaria: 250.00,
    status: StatusQuarto.OCUPADO,
    camas: [{ tipo: TipoCama.CASAL_QUEEN, quantidade: 1 }],
    comodidades: []
  }
];

export const QuartoService = {
  getAll: async (): Promise<Quarto[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...quartos]), 500);
    });
  },

  create: async (input: CreateQuartoInput): Promise<Quarto> => {
    return new Promise((resolve) => {
      const newQuarto: Quarto = {
        id: Math.random().toString(36).substr(2, 9),
        status: StatusQuarto.LIVRE,
        ...input
      };
      quartos.push(newQuarto);
      setTimeout(() => resolve(newQuarto), 500);
    });
  },

  update: async (id: string, input: Partial<Quarto>): Promise<Quarto> => {
    return new Promise((resolve, reject) => {
      const index = quartos.findIndex(q => q.id === id);
      if (index === -1) return reject('Quarto não encontrado');
      
      quartos[index] = { ...quartos[index], ...input };
      setTimeout(() => resolve(quartos[index]), 500);
    });
  },
  
  delete: async (id: string): Promise<void> => {
      return new Promise((resolve) => {
          quartos = quartos.filter(q => q.id !== id);
          setTimeout(() => resolve(), 500);
      })
  }
};
