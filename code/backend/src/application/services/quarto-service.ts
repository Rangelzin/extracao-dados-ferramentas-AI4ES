import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../repositories/quarto-repository';
import { CreateQuartoDTO, UpdateQuartoDTO, QuartoResponseDTO } from '../dtos/quarto-dto';
import { Cama, StatusQuarto, TipoCama } from '../../domain/types';
import { randomUUID } from 'crypto';
import { QuartoMapper } from '../mappers/quarto-mapper';

/**
 * Service Layer (Application Service):
 * Responsável por orquestrar os Casos de Uso do módulo de Quartos.
 * Decisão de Design:
 * - Não contém regras de negócio de domínio (essas ficam na Entity 'Quarto').
 * - Atua como uma fachada para a UI/API, convertendo DTOs em Entidades e vice-versa.
 * - Gerencia transações (se houvesse) e persistência via Repositório.
 */
export class QuartoService {
    // Injeção de Dependência (DIP): Dependemos da abstração (Interface), não da implementação concreta do Repositório.
    // Isso facilita testes unitários e troca de banco de dados.
    constructor(private quartoRepository: IQuartoRepository) {}

    async cadastrarQuarto(input: CreateQuartoDTO): Promise<QuartoResponseDTO> {
        // Validação de unicidade (Regra de Aplicação)
        const existente = await this.quartoRepository.findByNumero(input.numero);
        if (existente) {
            throw new Error(`Quarto com número ${input.numero} já existe.`);
        }

        const camas: Cama[] = [];
        if (input.camas) {
            input.camas.forEach(c => {
                // Decisão: Geramos IDs únicos para sub-entidades (Camas) para permitir rastreabilidade individual no futuro.
                for (let i = 0; i < c.quantidade; i++) {
                    camas.push({ id: randomUUID(), tipo: c.tipo });
                }
            });
        }

        // Factory/Builder implícito: Construção da entidade com estado inicial válido.
        const novoQuarto = new Quarto(
            randomUUID(),
            input.numero,
            input.capacidade,
            input.tipo,
            input.precoDiaria,
            StatusQuarto.LIVRE,
            camas,
            []
        );

        await this.quartoRepository.save(novoQuarto);

        // Uso de Mapper (SRP): Separa a responsabilidade de formatação de resposta da lógica de negócio.
        return QuartoMapper.toDTO(novoQuarto);
    }

    async editarQuarto(id: string, input: UpdateQuartoDTO): Promise<QuartoResponseDTO> {
        const quarto = await this.quartoRepository.findById(id);
        if (!quarto) {
            throw new Error(`Quarto com ID ${id} não encontrado.`);
        }

        // Transformação de Input DTO -> Value Objects / Entidades
        // Uso de flatMap para converter a representação simplificada ({ tipo: 'Solteiro', qtd: 2 })
        // para a representação interna de domínio (Array de objetos Cama individuais).
        const novasCamas = input.camas 
            ? input.camas.flatMap(c => 
                Array(c.quantidade).fill(null).map(() => ({ id: randomUUID(), tipo: c.tipo } as Cama))
            ) 
            : undefined;

        // Delegação para o Domínio: A entidade sabe como manter seus invariantes ao atualizar dados.
        quarto.atualizarDados(
            input.numero,
            input.capacidade,
            input.tipo,
            input.precoDiaria,
            novasCamas,
            undefined
        );

        await this.quartoRepository.update(quarto);

        return QuartoMapper.toDTO(quarto);
    }

    async listarQuartos(): Promise<QuartoResponseDTO[]> {
        const quartos = await this.quartoRepository.findAll();
        // Projeção eficiente de dados para o cliente.
        return quartos.map(q => QuartoMapper.toDTO(q));
    }
}
