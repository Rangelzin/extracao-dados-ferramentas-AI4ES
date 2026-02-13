import { GestaoQuartosService, QuartoRepositoryMemory } from './gestao-quartos.js';
import { TipoQuarto, TipoCama, StatusDisponibilidade, Hospede } from './domain-entities.js';

// Mocks locais para evitar problemas de exportação de interface em ESM/Jest
class MockHospedeRepository {
  private hospedes: Hospede[] = [];
  async salvar(hospede: Hospede) { this.hospedes.push(hospede); }
  async buscarPorCpf(cpf: string) { return this.hospedes.find(h => h.cpf === cpf); }
}

class MockReservaRepository {
  async salvar(reserva: any) { return; }
}

describe('Hotel Integration - Fluxo de Reserva', () => {
  let integrationService: any;
  let quartoService: GestaoQuartosService;
  let quartoRepo: QuartoRepositoryMemory;
  let hospedeRepo: MockHospedeRepository;
  let reservaRepo: MockReservaRepository;

  beforeEach(async () => {
    // Import dinâmico ou uso direto da classe para contornar erro de exportação se necessário
    const { HotelIntegrationService } = await import('./hotel-integration.js');
    
    quartoRepo = new QuartoRepositoryMemory();
    quartoService = new GestaoQuartosService(quartoRepo);
    hospedeRepo = new MockHospedeRepository();
    reservaRepo = new MockReservaRepository();
    
    integrationService = new HotelIntegrationService(quartoService, hospedeRepo as any, reservaRepo as any);

    await quartoService.cadastrar({
      numero: '505',
      capacidade: 2,
      tipo: TipoQuarto.LUXO,
      precoDiaria: 500,
      temFrigobar: true,
      temCafeIncluso: true,
      temArCondicionado: true,
      temTV: true,
      tiposCama: [TipoCama.CASAL_KING]
    });
  });

  it('deve realizar o fluxo completo: cadastrar hóspede, criar reserva e ocupar o quarto', async () => {
    const dadosReserva = {
      hospede: {
        nome: 'João',
        sobrenome: 'Silva',
        cpf: '123.456.789-00',
        email: 'joao@email.com'
      },
      numeroQuarto: '505',
      dataInicio: new Date(),
      dataFim: new Date(Date.now() + 86400000)
    };

    const resultado = await integrationService.realizarReservaFluxoCompleto(dadosReserva);

    expect(resultado.hospede.nome).toBe('João');
    const quartoStatus = await quartoRepo.buscarPorNumero('505');
    expect(quartoStatus?.status).toBe(StatusDisponibilidade.OCUPADO);
  });
});
