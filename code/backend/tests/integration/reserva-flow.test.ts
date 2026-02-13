import { ReservaService, CreateReservaDTO } from '../../src/application/services/reserva-service';
import { HospedeService, CreateHospedeDTO } from '../../src/application/services/hospede-service';
import { IQuartoRepository } from '../../src/application/repositories/quarto-repository';
import { IHospedeRepository } from '../../src/application/repositories/hospede-repository';
import { IReservaRepository } from '../../src/application/repositories/reserva-repository';
import { Quarto } from '../../src/domain/entities/Quarto';
import { Hospede } from '../../src/domain/entities/Hospede';
import { TipoQuarto, StatusQuarto, StatusReserva } from '../../src/domain/types';
import { Reserva } from '../../src/domain/entities/Reserva';

// Mocks
const mockQuartoRepo: jest.Mocked<IQuartoRepository> = {
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByNumero: jest.fn(),
  delete: jest.fn(),
};

const mockHospedeRepo: jest.Mocked<IHospedeRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  findByCpf: jest.fn(),
  findAll: jest.fn(),
};

const mockReservaRepo: jest.Mocked<IReservaRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
};

describe('Fluxo de Integração: Reserva de Quarto', () => {
    let reservaService: ReservaService;
    let hospedeService: HospedeService;

    beforeEach(() => {
        jest.clearAllMocks();
        hospedeService = new HospedeService(mockHospedeRepo);
        reservaService = new ReservaService(mockReservaRepo, mockQuartoRepo, mockHospedeRepo);
    });

    it('Deve realizar o fluxo completo: Cadastrar Hóspede -> Reservar Quarto -> Atualizar Disponibilidade', async () => {
        // --- ETAPA 1: Cadastro de Hóspede ---
        const hospedeDTO: CreateHospedeDTO = {
            nome: 'João',
            sobrenome: 'Silva',
            cpf: '123.456.789-00',
            email: 'joao@example.com'
        };

        mockHospedeRepo.findByCpf.mockResolvedValue(null); // Não existe ainda

        const hospedeCadastrado = await hospedeService.cadastrar(hospedeDTO);

        expect(hospedeCadastrado).toBeDefined();
        expect(hospedeCadastrado.getCpf()).toBe(hospedeDTO.cpf);
        expect(mockHospedeRepo.save).toHaveBeenCalledTimes(1);

        // --- PREPARAÇÃO: Quarto Disponível ---
        const quartoDisponivel = new Quarto(
            'quarto-id-1',
            '101',
            2,
            TipoQuarto.BASICO,
            100,
            StatusQuarto.LIVRE
        );

        // Simula comportamento do Repositório
        mockHospedeRepo.findById.mockResolvedValue(hospedeCadastrado);
        mockQuartoRepo.findById.mockResolvedValue(quartoDisponivel);

        // --- ETAPA 2: Criação de Reserva ---
        const reservaDTO: CreateReservaDTO = {
            hospedeId: hospedeCadastrado.getId(),
            quartoId: quartoDisponivel.getId(),
            dataCheckIn: new Date('2023-12-01'),
            dataCheckOut: new Date('2023-12-05')
        };

        const novaReserva = await reservaService.criarReserva(reservaDTO);

        // --- ETAPA 3: Verificações (Asserts) ---
        
        // 1. A reserva foi criada corretamente?
        expect(novaReserva).toBeDefined();
        expect(novaReserva.calcularValorTotal()).toBe(400); // 4 dias * 100
        expect(mockReservaRepo.save).toHaveBeenCalledTimes(1);
        expect(mockReservaRepo.save).toHaveBeenCalledWith(expect.any(Reserva));

        // 2. O quarto teve seu status atualizado?
        expect(quartoDisponivel.getStatus()).toBe(StatusQuarto.OCUPADO);
        expect(mockQuartoRepo.update).toHaveBeenCalledTimes(1);
        expect(mockQuartoRepo.update).toHaveBeenCalledWith(quartoDisponivel);
    });
});
