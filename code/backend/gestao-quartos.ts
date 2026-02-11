import { TipoQuarto, StatusDisponibilidade, TipoCama, Cama, Quarto } from './domain-entities.js';

/**
 * SRP: Interface segregada para persistência de quartos.
 * DIP: O serviço dependerá desta abstração (Dependency Inversion), facilitando testes e troca de DB.
 */
export interface IQuartoRepository {
  salvar(quarto: Quarto): Promise<void>;
  buscarPorNumero(numero: string): Promise<Quarto | undefined>;
  listarTodos(): Promise<Quarto[]>;
  atualizar(quarto: Quarto): Promise<void>;
}

/**
 * Implementação em memória (Falsificação para testes/prototipagem).
 * Métodos assíncronos (Promise) para manter a consistência com futuras implementações reais de DB.
 */
export class QuartoRepositoryMemory implements IQuartoRepository {
  private quartos: Quarto[] = [];

  async salvar(quarto: Quarto): Promise<void> {
    const existe = await this.buscarPorNumero(quarto.numero);
    if (existe) {
      throw new Error("Quarto já cadastrado com este número");
    }
    this.quartos.push(quarto);
  }

  async buscarPorNumero(numero: string): Promise<Quarto | undefined> {
    return this.quartos.find(q => q.numero === numero);
  }

  async listarTodos(): Promise<Quarto[]> {
    // Retorna uma cópia para evitar que mutações externas afetem o estado interno do repositório.
    return [...this.quartos];
  }

  async atualizar(quarto: Quarto): Promise<void> {
    const index = this.quartos.findIndex(q => q.numero === quarto.numero);
    if (index === -1) {
      throw new Error("Quarto não encontrado para atualização");
    }
    this.quartos[index] = quarto;
  }
}

/**
 * Data Transfer Object (DTO) para criação de quartos.
 * Evita que o serviço dependa diretamente da estrutura interna da Entidade para entrada de dados.
 */
export interface CriarQuartoDTO {
  numero: string;
  capacidade: number;
  tipo: TipoQuarto;
  precoDiaria: number;
  temFrigobar: boolean;
  temCafeIncluso: boolean;
  temArCondicionado: boolean;
  temTV: boolean;
  tiposCama: TipoCama[];
}

/**
 * GestaoQuartosService: Orquestrador da lógica de negócio de quartos.
 * Aplica os princípios SOLID para garantir manutenibilidade.
 */
export class GestaoQuartosService {
  // Dependency Injection via constructor.
  constructor(private readonly repo: IQuartoRepository) {}

  /**
   * Encapsula a criação e persistência de um novo quarto.
   */
  async cadastrar(dto: CriarQuartoDTO): Promise<Quarto> {
    this.validarNumeroQuarto(dto.numero);
    
    // Converte os tipos de cama em instâncias da classe Cama.
    const camas = dto.tiposCama.map(tipo => new Cama(tipo));
    
    const novoQuarto = new Quarto(
      dto.numero,
      dto.capacidade,
      dto.tipo,
      dto.precoDiaria,
      dto.temFrigobar,
      dto.temCafeIncluso,
      dto.temArCondicionado,
      dto.temTV,
      camas
    );

    await this.repo.salvar(novoQuarto);
    return novoQuarto;
  }

  /**
   * Busca e atualiza um quarto existente.
   */
  async editar(numero: string, dados: Partial<Quarto>): Promise<Quarto> {
    const quarto = await this.repo.buscarPorNumero(numero);
    if (!quarto) {
      throw new Error(`Quarto ${numero} não encontrado`);
    }

    // Aplica as atualizações parciais à instância encontrada.
    Object.assign(quarto, dados);
    
    await this.repo.atualizar(quarto);
    return quarto;
  }

  /**
   * Retorna uma lista otimizada para a visualização na tabela do frontend.
   */
  async listarParaExibicao() {
    const quartos = await this.repo.listarTodos();
    return quartos.map(q => ({
      numero: q.numero,
      tipo: q.tipo,
      precoDiaria: q.precoDiaria,
      disponibilidade: q.status
    }));
  }

  /**
   * Validação simples para garantir integridade básica antes da persistência.
   */
  private validarNumeroQuarto(numero: string): void {
    if (!numero || numero.trim() === "") {
      throw new Error("Número do quarto é obrigatório");
    }
  }
}
