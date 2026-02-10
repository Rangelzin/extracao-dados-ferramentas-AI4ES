import { TipoQuarto, StatusQuarto, Cama, Comodidade } from '../types';

/**
 * Domain Entity: Quarto
 * Implementa o padrão "Rich Domain Model".
 * - Encapsula estado e comportamento.
 * - Garante invariantes de negócio (validar via construtor e métodos).
 * - Imutabilidade controlada (atributos privados, alterados apenas por métodos semânticos).
 */
export class Quarto {
    // Encapsulamento: Propriedades privadas para impedir modificação direta externa.
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
        
        // Auto-validação: A entidade nunca deve existir em um estado inválido.
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

    public getCapacidade(): number {
        return this.capacidade;
    }

    public getTipo(): TipoQuarto {
        return this.tipo;
    }

    public getStatus(): StatusQuarto {
        return this.status;
    }

    public getPrecoDiaria(): number {
        return this.precoDiaria;
    }

    public getCamas(): Cama[] {
        return this.camas;
    }

    public getComodidades(): Comodidade[] {
        return this.comodidades;
    }

    public atualizarDados(
        numero?: string,
        capacidade?: number,
        tipo?: TipoQuarto,
        precoDiaria?: number,
        camas?: Cama[],
        comodidades?: Comodidade[]
    ): void {
        if (numero) this.numero = numero;
        if (capacidade) this.capacidade = capacidade;
        if (tipo) this.tipo = tipo;
        if (precoDiaria) this.precoDiaria = precoDiaria;
        if (camas) this.camas = camas;
        if (comodidades) this.comodidades = comodidades;

        this.validar();
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
