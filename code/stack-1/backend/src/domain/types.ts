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

export enum StatusReserva {
    CONFIRMADA = 'CONFIRMADA',
    PENDENTE = 'PENDENTE',
    CANCELADA = 'CANCELADA',
    CHECKED_IN = 'CHECKED_IN',
    CHECKED_OUT = 'CHECKED_OUT'
}

export interface Cama {
    id: string;
    tipo: TipoCama;
}

export interface Comodidade {
    id: string;
    nome: string;
    descricao?: string;
}
