import { TipoQuarto, StatusQuarto, Cama, Comodidade } from '../types';

export class Quarto {
    private id: string;
    private numero: string;
    private capacidade: number;
    private tipo: TipoQuarto;
    private precoDiaria: number;
    private status: StatusQuarto;
    private camas: Cama[];
    private comodidades: Comodidade[];

    constructor(
        id: string,
        numero: string,
        capacidade: number,
        tipo: TipoQuarto,
        precoDiaria: number,
        status: StatusQuarto = StatusQuarto.LIVRE,
        camas: Cama[] = [],
        comodidades: Comodidade[] = []
    ) {
        this.id = id;
        this.numero = numero;
        this.capacidade = capacidade;
        this.tipo = tipo;
        this.precoDiaria = precoDiaria;
        this.status = status;
        this.camas = camas;
        this.comodidades = comodidades;
        
        this.validar();
    }

    private validar(): void {
        if (this.capacidade <= 0) {
            throw new Error("A capacidade do quarto deve ser maior que zero.");
        }
        if (this.precoDiaria <= 0) {
            throw new Error("O preço da diária deve ser maior que zero.");
        }
    }

    public getId(): string {
        return this.id;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getStatus(): StatusQuarto {
        return this.status;
    }

    public getPrecoDiaria(): number {
        return this.precoDiaria;
    }

    public isDisponivel(): boolean {
        return this.status === StatusQuarto.LIVRE;
    }

    public marcarComoOcupado(): void {
        if (this.status !== StatusQuarto.LIVRE) {
            throw new Error("Não é possível ocupar um quarto que não está livre.");
        }
        this.status = StatusQuarto.OCUPADO;
    }

    public liberar(): void {
        this.status = StatusQuarto.LIMPEZA;
    }
}
