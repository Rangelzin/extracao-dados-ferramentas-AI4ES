import { Hospede } from '../../domain/entities/Hospede';
import { IHospedeRepository } from '../repositories/hospede-repository';
import { randomUUID } from 'crypto';

export interface CreateHospedeDTO {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
}

export class HospedeService {
    constructor(private hospedeRepository: IHospedeRepository) {}

    async cadastrar(input: CreateHospedeDTO): Promise<Hospede> {
        const existente = await this.hospedeRepository.findByCpf(input.cpf);
        if (existente) {
            throw new Error(`Hóspede com CPF ${input.cpf} já cadastrado.`);
        }

        const novoHospede = new Hospede(
            randomUUID(),
            input.nome,
            input.sobrenome,
            input.cpf,
            input.email
        );

        await this.hospedeRepository.save(novoHospede);
        return novoHospede;
    }

    async buscarPorId(id: string): Promise<Hospede | null> {
        return this.hospedeRepository.findById(id);
    }
}
