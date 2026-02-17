export enum TipoQuarto {
  BASICO = 'BASICO',
  MODERNO = 'MODERNO',
  LUXO = 'LUXO'
}

export enum StatusQuarto {
  LIVRE = 'LIVRE',
  OCUPADO = 'OCUPADO',
  MANUTENCAO = 'MANUTENCAO',
  LIMPEZA = 'LIMPEZA'
}

export enum TipoCama {
  SOLTEIRO = 'SOLTEIRO',
  CASAL_KING = 'CASAL_KING',
  CASAL_QUEEN = 'CASAL_QUEEN'
}

export interface Cama {
  tipo: TipoCama;
  quantidade: number;
}

export interface Quarto {
  id: string;
  numero: string;
  capacidade: number;
  tipo: TipoQuarto;
  precoDiaria: number;
  status: StatusQuarto;
  camas: Cama[];
  comodidades: string[]; // Simplificado para ids
}

export type CreateQuartoInput = Omit<Quarto, 'id' | 'status'>;
