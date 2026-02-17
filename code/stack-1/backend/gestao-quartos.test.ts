import { GestaoQuartosService, QuartoRepositoryMemory } from './gestao-quartos.js';
import { TipoQuarto, TipoCama, StatusDisponibilidade } from './domain-entities.js';

describe('GestaoQuartosService', () => {
  let service: GestaoQuartosService;
  let repo: QuartoRepositoryMemory;

  beforeEach(() => {
    repo = new QuartoRepositoryMemory();
    service = new GestaoQuartosService(repo);
  });

  describe('Cadastro de Quarto', () => {
    it('deve cadastrar um novo quarto com sucesso', async () => {
      const dto = {
        numero: '101',
        capacidade: 2,
        tipo: TipoQuarto.BASICO,
        precoDiaria: 150,
        temFrigobar: true,
        temCafeIncluso: true,
        temArCondicionado: false,
        temTV: true,
        tiposCama: [TipoCama.CASAL_QUEEN]
      };

      const quarto = await service.cadastrar(dto);

      expect(quarto.numero).toBe('101');
      expect(quarto.status).toBe(StatusDisponibilidade.LIVRE);
      const salvo = await repo.buscarPorNumero('101');
      expect(salvo).toBeDefined();
    });

    it('não deve permitir cadastrar dois quartos com o mesmo número', async () => {
      const dto = {
        numero: '101',
        capacidade: 2,
        tipo: TipoQuarto.BASICO,
        precoDiaria: 150,
        temFrigobar: true,
        temCafeIncluso: true,
        temArCondicionado: false,
        temTV: true,
        tiposCama: [TipoCama.CASAL_QUEEN]
      };

      await service.cadastrar(dto);
      await expect(service.cadastrar(dto)).rejects.toThrow("Quarto já cadastrado com este número");
    });

    it('deve validar que o número do quarto é obrigatório', async () => {
      const dto: any = {
        numero: '',
        capacidade: 2,
        tipo: TipoQuarto.BASICO,
        precoDiaria: 150,
        tiposCama: []
      };

      await expect(service.cadastrar(dto)).rejects.toThrow("Número do quarto é obrigatório");
    });
  });

  describe('Edição de Quarto', () => {
    it('deve editar um quarto existente com sucesso', async () => {
      const dto = {
        numero: '202',
        capacidade: 3,
        tipo: TipoQuarto.MODERNO,
        precoDiaria: 250,
        temFrigobar: true,
        temCafeIncluso: true,
        temArCondicionado: true,
        temTV: true,
        tiposCama: [TipoCama.SOLTEIRO, TipoCama.CASAL_KING]
      };

      await service.cadastrar(dto);

      const quartoEditado = await service.editar('202', { precoDiaria: 300, status: StatusDisponibilidade.OCUPADO });

      expect(quartoEditado.precoDiaria).toBe(300);
      expect(quartoEditado.status).toBe(StatusDisponibilidade.OCUPADO);
      
      const salvo = await repo.buscarPorNumero('202');
      expect(salvo?.precoDiaria).toBe(300);
    });

    it('deve lançar erro ao tentar editar um quarto inexistente', async () => {
      await expect(service.editar('999', { precoDiaria: 500 }))
        .rejects.toThrow("Quarto 999 não encontrado");
    });
  });
});
