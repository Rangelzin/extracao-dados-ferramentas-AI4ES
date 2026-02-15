import Quarto from '../models/Quarto';

type Disponibilidade = 'Ocupado' | 'Livre' | 'Manutenção' | 'Limpeza';

const quartos: Quarto[] = [];

class QuartoController {
  static cadastrarQuarto(
    numero: number,
    capacidade: number,
    tipo: 'Básico' | 'Moderno' | 'Luxo',
    precoPorDiaria: number,
    frigobar: boolean,
    cafeDaManha: boolean,
    arCondicionado: boolean,
    tv: boolean,
    camas: string[]
  ): Quarto {
    const novoQuarto = new Quarto(
      numero,
      capacidade,
      tipo,
      precoPorDiaria,
      frigobar,
      cafeDaManha,
      arCondicionado,
      tv,
      camas
    );
    quartos.push(novoQuarto);
    return novoQuarto;
  }

  static editarQuarto(
    numero: number,
    dadosAtualizados: Partial<{
      capacidade: number;
      tipo: 'Básico' | 'Moderno' | 'Luxo';
      precoPorDiaria: number;
      frigobar: boolean;
      cafeDaManha: boolean;
      arCondicionado: boolean;
      tv: boolean;
      camas: string[];
      disponibilidade: Disponibilidade;
    }>
  ): Quarto | null {
    const quarto = quartos.find((q) => q.numero === numero);
    if (!quarto) return null;

    Object.assign(quarto, dadosAtualizados);
    return quarto;
  }

  static listarQuartos(): Array<{
    numero: number;
    tipo: 'Básico' | 'Moderno' | 'Luxo';
    precoPorDiaria: number;
    disponibilidade: Disponibilidade;
  }> {
    return quartos.map((quarto) => ({
      numero: quarto.numero,
      tipo: quarto.tipo,
      precoPorDiaria: quarto.precoPorDiaria,
      disponibilidade: 'Livre', // Default value for now
    }));
  }
}

export default QuartoController;