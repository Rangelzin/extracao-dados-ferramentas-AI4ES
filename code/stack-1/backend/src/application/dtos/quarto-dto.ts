import { TipoQuarto, StatusQuarto, TipoCama } from '../../domain/types';

export interface CreateQuartoDTO {
    numero: string;
    capacidade: number;
    tipo: TipoQuarto;
    precoDiaria: number;
    camas: { tipo: TipoCama, quantidade: number }[]; // Simplificado para input
    comodidadesIds?: string[]; // IDs das comodidades
}

export interface UpdateQuartoDTO {
    numero?: string;
    capacidade?: number;
    tipo?: TipoQuarto;
    precoDiaria?: number;
    status?: StatusQuarto;
    camas?: { tipo: TipoCama, quantidade: number }[];
    comodidadesIds?: string[];
}

export interface QuartoResponseDTO {
    id: string;
    numero: string;
    capacidade: number;
    tipo: TipoQuarto;
    precoDiaria: number;
    status: StatusQuarto;
    camas: { tipo: TipoCama, quantidade: number }[];
    comodidades: { id: string, nome: string }[];
}
