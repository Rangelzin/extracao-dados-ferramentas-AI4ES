import { GestaoQuartosService, QuartoRepositoryMemory } from './gestao-quartos.js';
import { TipoQuarto, TipoCama, StatusDisponibilidade, Hospede } from './domain-entities.js';

// Interfaces definidas no mesmo arquivo para evitar problemas de exportação em testes ESM
export interface IHospedeRepository {
  salvar(hospede: Hospede): Promise<void>;
  buscarPorCpf(cpf: string): Promise<Hospede | undefined>;
}

export interface IReservaRepository {
  salvar(reserva: any): Promise<void>;
}

export class HotelIntegrationService {
  constructor(
    private quartoService: GestaoQuartosService,
    private hospedeRepo: IHospedeRepository,
    private reservaRepo: IReservaRepository
  ) {}

  async realizarReservaFluxoCompleto(dados: {
    hospede: { nome: string; sobrenome: string; cpf: string; email: string };
    numeroQuarto: string;
    dataInicio: Date;
    dataFim: Date;
  }) {
    let hospede = await this.hospedeRepo.buscarPorCpf(dados.hospede.cpf);
    if (!hospede) {
      hospede = new Hospede(dados.hospede.nome, dados.hospede.sobrenome, dados.hospede.cpf, dados.hospede.email);
      await this.hospedeRepo.salvar(hospede);
    }

    const quarto = await this.quartoService.editar(dados.numeroQuarto, { 
      status: StatusDisponibilidade.OCUPADO 
    });

    const reserva = {
      id: Math.random().toString(36).substring(2, 11),
      hospede,
      quarto,
      dataInicio: dados.dataInicio,
      dataFim: dados.dataFim,
      status: 'Confirmada'
    };
    await this.reservaRepo.salvar(reserva);

    return { reserva, hospede, quarto };
  }
}
