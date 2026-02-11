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

export class Cama {
  constructor(public tipo: TipoCama) {}
}

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
    public status: StatusDisponibilidade = StatusDisponibilidade.LIVRE
  ) {}
}

export class Hospede {
  constructor(
    public nome: string,
    public sobrenome: string,
    public cpf: string,
    public email: string
  ) {}
}

export class Reserva {
  constructor(
    public id: string,
    public quarto: Quarto,
    public hospede: Hospede,
    public dataInicio: Date,
    public dataFim: Date,
    public status: string = 'Confirmada'
  ) {}

  public calcularTotalPreco(): number {
    const diffTime = Math.abs(this.dataFim.getTime() - this.dataInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * this.quarto.precoDiaria;
  }
}
