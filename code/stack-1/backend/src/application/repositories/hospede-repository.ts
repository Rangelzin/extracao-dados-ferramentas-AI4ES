import { Hospede } from '../../domain/entities/Hospede';

export interface IHospedeRepository {
    save(hospede: Hospede): Promise<void>;
    findById(id: string): Promise<Hospede | null>;
    findByCpf(cpf: string): Promise<Hospede | null>;
    findAll(): Promise<Hospede[]>;
}
