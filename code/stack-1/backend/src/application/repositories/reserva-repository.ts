import { Reserva } from '../../domain/entities/Reserva';

export interface IReservaRepository {
    save(reserva: Reserva): Promise<void>;
    findById(id: string): Promise<Reserva | null>;
    update(reserva: Reserva): Promise<void>;
    findAll(): Promise<Reserva[]>;
}
