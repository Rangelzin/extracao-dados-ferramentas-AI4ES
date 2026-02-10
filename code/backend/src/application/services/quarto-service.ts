import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../repositories/quarto-repository';
import { CreateQuartoDTO, UpdateQuartoDTO, QuartoResponseDTO } from '../dtos/quarto-dto';
import { Cama, StatusQuarto, TipoCama } from '../../domain/types';
import { randomUUID } from 'crypto';

export class QuartoService {
    constructor(private quartoRepository: IQuartoRepository) {}

    async cadastrarQuarto(input: CreateQuartoDTO): Promise<QuartoResponseDTO> {
        const existente = await this.quartoRepository.findByNumero(input.numero);
        if (existente) {
            throw new Error(`Quarto com número ${input.numero} já existe.`);
        }

        // Converter input de camas para array de objetos Cama com ID
        const camas: Cama[] = [];
        if (input.camas) {
            input.camas.forEach(c => {
                for (let i = 0; i < c.quantidade; i++) {
                    camas.push({ id: randomUUID(), tipo: c.tipo });
                }
            });
        }

        const novoQuarto = new Quarto(
            randomUUID(),
            input.numero,
            input.capacidade,
            input.tipo,
            input.precoDiaria,
            StatusQuarto.LIVRE, // Status inicial padrão
            camas,
            [] // Comodidades vazias por enquanto (precisaria buscar do repositório de comodidades)
        );

        await this.quartoRepository.save(novoQuarto);

        return this.mapToDTO(novoQuarto);
    }

    async editarQuarto(id: string, input: UpdateQuartoDTO): Promise<QuartoResponseDTO> {
        const quarto = await this.quartoRepository.findById(id);
        if (!quarto) {
            throw new Error(`Quarto com ID ${id} não encontrado.`);
        }

        const novasCamas = input.camas 
            ? input.camas.flatMap(c => 
                Array(c.quantidade).fill(null).map(() => ({ id: randomUUID(), tipo: c.tipo } as Cama))
            ) 
            : undefined;

        quarto.atualizarDados(
            input.numero,
            input.capacidade,
            input.tipo,
            input.precoDiaria,
            novasCamas,
            undefined // Comodidades não tratadas neste exemplo
        );

        await this.quartoRepository.update(quarto);

        return this.mapToDTO(quarto);
    }

    async listarQuartos(): Promise<QuartoResponseDTO[]> {
        const quartos = await this.quartoRepository.findAll();
        return quartos.map(q => this.mapToDTO(q));
    }

    private mapToDTO(quarto: Quarto): QuartoResponseDTO {
        const camas = quarto.getCamas();
        const camasGrouped = camas.reduce((acc: any, cama: Cama) => {
            if (!acc[cama.tipo]) {
                acc[cama.tipo] = 0 as number;
            }
            acc[cama.tipo]++;
            return acc;
        }, {});

        const camasList = Object.keys(camasGrouped).map(tipo => ({
            tipo: tipo as TipoCama,
            quantidade: camasGrouped[tipo] as number
        }));

        return {
            id: quarto.getId(),
            numero: quarto.getNumero(),
            capacidade: quarto.getCapacidade(),
            tipo: quarto.getTipo(),
            precoDiaria: quarto.getPrecoDiaria(),
            status: quarto.getStatus(),
            camas: camasList,
            comodidades: [] // Placeholder
        };
    }
}
