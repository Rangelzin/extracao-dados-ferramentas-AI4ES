import { Quarto } from '../models/Quarto';

describe('Quarto', () => {
  it('deve cadastrar um quarto corretamente', () => {
    const quarto = new Quarto(101, 2, 'Básico', 150, true, true, false, true, [
      { tipo: 'Solteiro', quantidade: 2 }
    ]);
    expect(quarto.numero).toBe(101);
    expect(quarto.capacidade).toBe(2);
    expect(quarto.tipo).toBe('Básico');
    expect(quarto.precoPorDiaria).toBe(150);
    expect(quarto.frigobar).toBe(true);
    expect(quarto.cafeDaManha).toBe(true);
    expect(quarto.arCondicionado).toBe(false);
    expect(quarto.tv).toBe(true);
    expect(quarto.camas).toEqual([{ tipo: 'Solteiro', quantidade: 2 }]);
  });

  it('deve editar os dados do quarto corretamente', () => {
    const quarto = new Quarto(102, 3, 'Luxo', 300, false, false, true, false, [
      { tipo: 'Casal King', quantidade: 1 }
    ]);
    quarto.tipo = 'Moderno';
    quarto.precoPorDiaria = 200;
    quarto.frigobar = true;
    quarto.cafeDaManha = true;
    quarto.camas = [{ tipo: 'Solteiro', quantidade: 3 }];
    expect(quarto.tipo).toBe('Moderno');
    expect(quarto.precoPorDiaria).toBe(200);
    expect(quarto.frigobar).toBe(true);
    expect(quarto.cafeDaManha).toBe(true);
    expect(quarto.camas).toEqual([{ tipo: 'Solteiro', quantidade: 3 }]);
  });
});
