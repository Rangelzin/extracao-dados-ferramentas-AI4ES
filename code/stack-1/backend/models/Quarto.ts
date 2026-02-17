class Quarto {
  numero: number;
  capacidade: number;
  tipo: 'Básico' | 'Moderno' | 'Luxo';
  precoPorDiaria: number;
  frigobar: boolean;
  cafeDaManha: boolean;
  arCondicionado: boolean;
  tv: boolean;
  camas: string[];

  constructor(
    numero: number,
    capacidade: number,
    tipo: 'Básico' | 'Moderno' | 'Luxo',
    precoPorDiaria: number,
    frigobar: boolean,
    cafeDaManha: boolean,
    arCondicionado: boolean,
    tv: boolean,
    camas: string[]
  ) {
    this.numero = numero;
    this.capacidade = capacidade;
    this.tipo = tipo;
    this.precoPorDiaria = precoPorDiaria;
    this.frigobar = frigobar;
    this.cafeDaManha = cafeDaManha;
    this.arCondicionado = arCondicionado;
    this.tv = tv;
    this.camas = camas;
  }
}

export default Quarto;