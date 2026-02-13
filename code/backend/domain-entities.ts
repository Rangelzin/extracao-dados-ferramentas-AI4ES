/**
 * Enums para tipos e estados do domínio.
 * O uso de string enums facilita a leitura em logs e no frontend.
 */
export enum TipoQuarto {
  BASICO = 'Básico',
  MODERNO = 'Moderno',
  LUXO = 'Luxo'
}

export enum StatusDisponibilidade {
  LIVRE = 'Livre',
  OCUPADO = 'Ocupado',
  MANUTENCAO = 'Manutenção',
  LIMPEZA = 'Limpeza'
}

export enum TipoCama {
  SOLTEIRO = 'Solteiro',
  CASAL_KING = 'Casal King',
  CASAL_QUEEN = 'Casal Queen'
}

/**
 * Entidade Cama: Representa a composição física de dormitório no Quarto.
 */
export class Cama {
  constructor(public tipo: TipoCama) {}
}

/**
 * Entidade Quarto: Core do sistema.
 * Segue o padrão de Domain Driven Design (DDD) onde a entidade contém seus dados.
 */
export class Quarto {
  constructor(
    public numero: string,
    public capacidade: number,
    public tipo: TipoQuarto,
    public precoDiaria: number,
    public temFrigobar: boolean,
    public temCafeIncluso: boolean,
    public temArCondicionado: boolean,
    public temTV: boolean,
    public camas: Cama[],
    // Status default inicial é LIVRE para novos quartos.
    public status: StatusDisponibilidade = StatusDisponibilidade.LIVRE
  ) {}
}

/**
 * Data Transfer Object (DTO) para criação de quartos.
 * Compartilhado entre Backend e Frontend para garantir integridade.
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
 * Entidade Hospede: Armazena informações de contato e identificação.
 */
export class Hospede {
  constructor(
    public nome: string,
    public sobrenome: string,
    public cpf: string,
    public email: string
  ) {}
}

/**
 * Entidade Reserva: Agrega Quarto, Hospede e Período.
 */
export class Reserva {
  constructor(
    public id: string,
    public quarto: Quarto,
    public hospede: Hospede,
    public dataInicio: Date,
    public dataFim: Date,
    public status: string = 'Confirmada'
  ) {}

  /**
   * Encapsulamento da lógica de cálculo de preço total.
   * Centraliza a regra de negócio para evitar duplicação no frontend/backend.
   */
  public calcularTotalPreco(): number {
    const diffTime = Math.abs(this.dataFim.getTime() - this.dataInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Se a reserva for no mesmo dia, cobramos ao menos uma diária (ceil).
    return (diffDays || 1) * this.quarto.precoDiaria;
  }
}
