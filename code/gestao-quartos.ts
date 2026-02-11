import { TipoQuarto, StatusDisponibilidade, TipoCama, Cama, Quarto } from './domain-entities';

export interface IQuartoRepository {
  salvar(quarto: Quarto): void;
  buscarPorNumero(numero: string): Quarto | undefined;
  listarTodos(): Quarto[];
  atualizar(quarto: Quarto): void;
}

export class QuartoRepositoryMemory implements IQuartoRepository {
  private quartos: Quarto[] = [];

  salvar(quarto: Quarto): void {
    const index = this.quartos.findIndex(q => q.numero === quarto.numero);
    if (index !== -1) {
      throw new Error("Quarto já cadastrado");
    }
    this.quartos.push(quarto);
  }

  buscarPorNumero(numero: string): Quarto | undefined {
    return this.quartos.find(q => q.numero === numero);
  }

  listarTodos(): Quarto[] {
    return this.quartos;
  }

  atualizar(quarto: Quarto): void {
    const index = this.quartos.findIndex(q => q.numero === quarto.numero);
    if (index === -1) {
      throw new Error("Quarto não encontrado para atualização");
    }
    this.quartos[index] = quarto;
  }
}

export class GestaoQuartosService {
  constructor(private repo: IQuartoRepository) {}

  cadastrarQuarto(dados: {
    numero: string;
    capacidade: number;
    tipo: TipoQuarto;
    precoDiaria: number;
    temFrigobar: boolean;
    temCafeIncluso: boolean;
    temArCondicionado: boolean;
    temTV: boolean;
    camas: TipoCama[];
  }): Quarto {
    const camasObj = dados.camas.map(tipo => new Cama(tipo));
    const novoQuarto = new Quarto(
      dados.numero,
      dados.capacidade,
      dados.tipo,
      dados.precoDiaria,
      dados.temFrigobar,
      dados.temCafeIncluso,
      dados.temArCondicionado,
      dados.temTV,
      camasObj
    );
    this.repo.salvar(novoQuarto);
    return novoQuarto;
  }

  editarQuarto(numero: string, dadosAtualizados: Partial<Quarto>): Quarto {
    const quarto = this.repo.buscarPorNumero(numero);
    if (!quarto) throw new Error("Quarto não encontrado");

    Object.assign(quarto, dadosAtualizados);
    this.repo.atualizar(quarto);
    return quarto;
  }

  listarQuartos() {
    return this.repo.listarTodos().map(q => ({
      numero: q.numero,
      tipo: q.tipo,
      precoDiaria: q.precoDiaria,
      disponibilidade: q.status
    }));
  }
}
