import { Reserva } from '../../domain/entities/Reserva';
import { IReservaRepository } from '../repositories/reserva-repository';
import { IQuartoRepository } from '../repositories/quarto-repository';
import { IHospedeRepository } from '../repositories/hospede-repository';
import { StatusReserva } from '../../domain/types';
import { randomUUID } from 'crypto';

export interface CreateReservaDTO {
    quartoId: string;
    hospedeId: string;
    dataCheckIn: Date;
    dataCheckOut: Date;
}

export class ReservaService {
    constructor(
        private reservaRepository: IReservaRepository,
        private quartoRepository: IQuartoRepository,
        private hospedeRepository: IHospedeRepository
    ) {}

    async criarReserva(input: CreateReservaDTO): Promise<Reserva> {
        // 1. Validar Hóspede
        const hospede = await this.hospedeRepository.findById(input.hospedeId);
        if (!hospede) {
            throw new Error(`Hóspede com ID ${input.hospedeId} não encontrado.`);
        }

        // 2. Validar Quarto
        const quarto = await this.quartoRepository.findById(input.quartoId);
        if (!quarto) {
            throw new Error(`Quarto com ID ${input.quartoId} não encontrado.`);
        }

        if (!quarto.isDisponivel()) {
            throw new Error(`Quarto ${quarto.getNumero()} não está disponível para reserva.`);
        }

        // 3. Criar Entidade Reserva
        const novaReserva = new Reserva(
            randomUUID(),
            quarto,
            hospede,
            input.dataCheckIn,
            input.dataCheckOut,
            StatusReserva.CONFIRMADA
        );

        // 4. Atualizar Estado do Quarto (Domain Logic)
        quarto.marcarComoOcupado();

        // 5. Persistir (Transação seria ideal aqui)
        await this.reservaRepository.save(novaReserva);
        await this.quartoRepository.update(quarto);

        return novaReserva;
    }
}
