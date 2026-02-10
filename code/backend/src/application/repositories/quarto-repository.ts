import { Quarto } from '../../domain/entities/Quarto';

export interface IQuartoRepository {
    save(quarto: Quarto): Promise<void>;
    update(quarto: Quarto): Promise<void>;
    findById(id: string): Promise<Quarto | null>;
    findByNumero(numero: string): Promise<Quarto | null>;
    findAll(): Promise<Quarto[]>;
    delete(id: string): Promise<void>;
}
