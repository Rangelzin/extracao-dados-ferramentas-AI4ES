### User Input

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



Identifique problemas de qualidade no código e sugira refatorações, se necessário.


### Planner Response

### Análise de Qualidade e Refatoração

Analisei o código do `QuartoService` e identifiquei alguns pontos de melhoria focados em **Clean Code** e **Domain-Action Separation**.

#### Problemas Identificados

1.  **Vazamento de Lógica de Domínio (Domain Leak)**:
    A lógica de transformar "Tipos de Cama + Quantidade" em uma lista de objetos [Cama](cci:2://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/domain/types.ts:27:0-30:1) individuais (com IDs únicos) é uma regra de negócio ou, no mínimo, uma lógica de tradução que está poluindo o Serviço de Aplicação.

2.  **Duplicação e Inconsistência**:
    - No método `cadastrarQuarto`, você usa um loop imperativo (`forEach` com `push`).
    - No método `editarQuarto`, você usa uma abordagem funcional (`flatMap`).
    - A mesma lógica de "gerar camas com IDs aleatórios" está repetida.

3.  **Acoplamento com Infraestrutura**:
    O uso direto de `randomUUID()` no meio da lógica de negócio dificulta testes determinísticos (embora seja aceitável em muitos casos, abstrair para um `IdGenerator` seria mais purista).

#### Proposta de Refatoração

Sugiro extrair a lógica de geração de camas para um método privado utilitário (ou mover para uma Factory do Domínio). Para manter o serviço coeso por enquanto, vamos criar um método privado `gerarCamas` e padronizar o uso de `flatMap` (mais limpo e funcional).

Aqui está o código refatorado:

```typescript
import { Quarto } from '../../domain/entities/Quarto';
import { IQuartoRepository } from '../repositories/quarto-repository';
import { CreateQuartoDTO, UpdateQuartoDTO, QuartoResponseDTO } from '../dtos/quarto-dto';
import { Cama, StatusQuarto, TipoCama } from '../../domain/types';
import { randomUUID } from 'crypto';
import { QuartoMapper } from '../mappers/quarto-mapper';

export class QuartoService {
    constructor(private quartoRepository: IQuartoRepository) {}

    async cadastrarQuarto(input: CreateQuartoDTO): Promise<QuartoResponseDTO> {
        const existente = await this.quartoRepository.findByNumero(input.numero);
        if (existente) {
            throw new Error(`Quarto com número ${input.numero} já existe.`);
        }

        // Refatorado: Lógica de geração extraída e simplificada
        const camas = this.gerarCamas(input.camas);

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
        return QuartoMapper.toDTO(novoQuarto);
    }

    async editarQuarto(id: string, input: UpdateQuartoDTO): Promise<QuartoResponseDTO> {
        const quarto = await this.quartoRepository.findById(id);
        if (!quarto) {
            throw new Error(`Quarto com ID ${id} não encontrado.`);
        }

        // Refatorado: Reuso da lógica consistente
        const novasCamas = input.camas ? this.gerarCamas(input.camas) : undefined;

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
        return quartos.map(q => QuartoMapper.toDTO(q));
    }

    /**
     * Helper Privado: Responsável por transformar a entrada simplificada (Tipo + Qtd)
     * em Entidades de Cama com identidade única.
     */
    private gerarCamas(camasInput?: { tipo: TipoCama; quantidade: number }[]): Cama[] {
        if (!camasInput) return [];
        
        return camasInput.flatMap(c => 
            Array.from({ length: c.quantidade }, () => ({
                id: randomUUID(),
                tipo: c.tipo
            }))
        );
    }
}
```

**Principais Mudanças:**
1.  **Método `gerarCamas`**: Centraliza a criação de camas, eliminando duplicação.
2.  **`Array.from`**: Mais legível que `Array(n).fill(null).map(...)`.
3.  **Legibilidade**: Os métodos principais ([cadastrar](cci:1://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/hospede-service.ts:14:4-30:5) e `editar`) ficaram focados apenas no fluxo de orquestração, delegando o "como montar os dados" para o helper.

Gostaria de aplicar essa refatoração no arquivo agora?

### User Input

sim

*Viewed [quarto-service.ts](file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts) *

*Edited relevant file*

*User accepted the command `npm test`*

*User accepted the command `git add .`*

*User accepted the command `git commit -m "docs: Etapa 6 - Problemas de qualidade no código" `*

### User Input

Forneça uma versão melhorada do código.

*Viewed [quarto-service.ts](file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts) *

### Planner Response

Aqui está a versão melhorada e refatorada do código, incorporando o método [gerarCamas](cci:1://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts:79:4-92:5) para eliminar duplicação e aumentar a coesão.

```typescript
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

        // Refatorado: Lógica de geração extraída e simplificada
        const camas = this.gerarCamas(input.camas);

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

        // Refatorado: Reuso lógica consistente
        // Transformação de Input DTO -> Value Objects / Entidades
        const novasCamas = input.camas ? this.gerarCamas(input.camas) : undefined;

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

    /**
     * Helper Privado: Responsável por transformar a entrada simplificada (Tipo + Qtd)
     * em Entidades de Cama com identidade única.
     */
    private gerarCamas(camasInput?: { tipo: TipoCama; quantidade: number }[]): Cama[] {
        if (!camasInput) return [];
        
        return camasInput.flatMap(c => 
            Array.from({ length: c.quantidade }, () => ({
                id: randomUUID(),
                tipo: c.tipo
            }))
        );
    }
}
```

### Melhorias Aplicadas
1.  **Refatoração DRY (Don't Repeat Yourself)**: A lógica de loop para criar camas, que era repetida e inconsistente (usava `forEach` num lugar e `flatMap` noutro), foi centralizada no método privado [gerarCamas](cci:1://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts:79:4-92:5).
2.  **Clean Code**: O uso de `flatMap` e `Array.from` torna a transformação de dados mais declarativa e menos propensa a erros de índice.
3.  **Coesão**: Os métodos públicos ([cadastrarQuarto](cci:1://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts:20:4-46:5), [editarQuarto](cci:1://file:///home/rangel/estudos/dev/labs/extracao-dados-ferramentas-AI4ES/code/backend/src/application/services/quarto-service.ts:48:4-71:5)) agora focam apenas no fluxo da transação, delegando detalhes de implementação (como gerar IDs de camas) para métodos auxiliares.

*Edited relevant file*

*Edited relevant file*

*User accepted the command `git add .`*

*User accepted the command `git commit -m "docs: Etapa 6 - Versão melhorada do código." `*

### User Input

Explique como isso reduz dívida técnica.

*Edited relevant file*

*Edited relevant file*