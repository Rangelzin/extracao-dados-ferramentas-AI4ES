import { QuartoService } from '../../src/application/services/quarto-service';
import { IQuartoRepository } from '../../src/application/repositories/quarto-repository';
import { CreateQuartoDTO, UpdateQuartoDTO } from '../../src/application/dtos/quarto-dto';
import { TipoQuarto, TipoCama, StatusQuarto } from '../../src/domain/types';
import { Quarto } from '../../src/domain/entities/Quarto';

// Mock do Repositório
const mockQuartoRepository: jest.Mocked<IQuartoRepository> = {
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByNumero: jest.fn(),
  delete: jest.fn(),
};

describe('QuartoService Unit Tests', () => {
  let quartoService: QuartoService;

  beforeEach(() => {
    jest.clearAllMocks();
    quartoService = new QuartoService(mockQuartoRepository);
  });

  describe('cadastrarQuarto', () => {
    it('deve cadastrar um quarto com sucesso', async () => {
      // Arrange
      const input: CreateQuartoDTO = {
        numero: '101',
        tipo: TipoQuarto.LUXO,
        capacidade: 2,
        precoDiaria: 200,
        camas: [{ tipo: TipoCama.CASAL_KING, quantidade: 1 }]
      };

      mockQuartoRepository.findByNumero.mockResolvedValue(null);
      mockQuartoRepository.save.mockResolvedValue();

      // Act
      const result = await quartoService.cadastrarQuarto(input);

      // Assert
      expect(result).toHaveProperty('id');
      expect(result.numero).toBe(input.numero);
      expect(mockQuartoRepository.save).toHaveBeenCalledTimes(1);
      expect(mockQuartoRepository.save).toHaveBeenCalledWith(expect.any(Quarto));
    });

    it('deve lançar erro se o quarto já existir', async () => {
      // Arrange
      const input: CreateQuartoDTO = {
        numero: '101',
        tipo: TipoQuarto.LUXO,
        capacidade: 2,
        precoDiaria: 200,
        camas: []
      };

      // Simula que já existe um quarto
      mockQuartoRepository.findByNumero.mockResolvedValue({} as Quarto); 

      // Act & Assert
      await expect(quartoService.cadastrarQuarto(input))
        .rejects
        .toThrow(`Quarto com número ${input.numero} já existe.`);
        
      expect(mockQuartoRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('editarQuarto', () => {
    it('deve editar um quarto existente com sucesso', async () => {
      // Arrange
      const id = 'existing-id';
      const input: UpdateQuartoDTO = {
        precoDiaria: 250
      };

      const existingQuarto = new Quarto(
        id, '101', 2, TipoQuarto.LUXO, 200, StatusQuarto.LIVRE, [], []
      );
      
      // Mock do comportamento do objeto de domínio (se necessário, mas aqui confiamos na lógica da entidade)
      // O mock retorna a instância real para testar a integração Service -> Entity -> Repo
      mockQuartoRepository.findById.mockResolvedValue(existingQuarto);
      mockQuartoRepository.update.mockResolvedValue();

      // Act
      const result = await quartoService.editarQuarto(id, input);

      // Assert
      expect(result.precoDiaria).toBe(250);
      expect(mockQuartoRepository.update).toHaveBeenCalledTimes(1);
      // Verifica se o objeto passado para update tem o preço novo
      const updatedQuarto = (mockQuartoRepository.update.mock.calls[0][0] as Quarto);
      expect(updatedQuarto.getPrecoDiaria()).toBe(250);
    });

    it('deve lançar erro ao tentar editar quarto inexistente', async () => {
        // Arrange
        const id = 'non-existent-id';
        const input: UpdateQuartoDTO = { precoDiaria: 300 };

        mockQuartoRepository.findById.mockResolvedValue(null);

        // Act & Assert
        await expect(quartoService.editarQuarto(id, input))
            .rejects
            .toThrow(`Quarto com ID ${id} não encontrado.`);
            
        expect(mockQuartoRepository.update).not.toHaveBeenCalled();
    });
  });
});
