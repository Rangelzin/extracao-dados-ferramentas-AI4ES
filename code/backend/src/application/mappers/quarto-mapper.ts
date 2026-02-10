import { Quarto } from '../../domain/entities/Quarto';
import { QuartoResponseDTO } from '../dtos/quarto-dto';
import { Cama, TipoCama } from '../../domain/types';

/**
 * Pattern: Data Mapper / Assembler
 * Responsabilidade: Converter objetos de Domínio (Entities) em objetos de Transporte (DTOs).
 * Motivação:
 * - Evitar acoplamento entre a camada de apresentação/API (DTOs) e a camada de domínio (Entities).
 * - Permitir que a entidade evolua sem quebrar contratos de API existentes.
 * - Centralizar lógicas de formatação (ex: agrupamento de camas).
 */
export class QuartoMapper {
    static toDTO(quarto: Quarto): QuartoResponseDTO {
        // Lógica de Apresentação: Agrupar camas por tipo para exibição resumida.
        // Ex: De [Cama(ID1, Solteiro), Cama(ID2, Solteiro)] para { Solteiro: 2 }
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
            comodidades: [] 
        };
    }
}
