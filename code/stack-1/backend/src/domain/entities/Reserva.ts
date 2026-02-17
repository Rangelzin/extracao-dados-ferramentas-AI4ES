import { StatusReserva } from '../types';
import { Quarto } from './Quarto';
import { Hospede } from './Hospede';

export class Reserva {
    private id: string;
    private quarto: Quarto;
    private hospede: Hospede;
    private dataCheckIn: Date;
    private dataCheckOut: Date;
    private status: StatusReserva;
    private valorTotal: number;

    constructor(
        id: string,
        quarto: Quarto,
        hospede: Hospede,
        dataCheckIn: Date,
        dataCheckOut: Date,
        status: StatusReserva = StatusReserva.PENDENTE
    ) {
        this.id = id;
        this.quarto = quarto;
        this.hospede = hospede;
        this.dataCheckIn = dataCheckIn;
        this.dataCheckOut = dataCheckOut;
        this.status = status;
        this.valorTotal = this.calcularValorTotal();
        
        this.validar();
    }

    private validar(): void {
        if (this.dataCheckIn >= this.dataCheckOut) {
            throw new Error("A data de Check-in deve ser anterior à data de Check-out.");
        }
        if (!this.quarto) {
            throw new Error("A reserva deve estar associada a um quarto.");
        }
        if (!this.hospede) {
            throw new Error("A reserva deve estar associada a um hóspede.");
        }
    }

    public calcularValorTotal(): number {
        const diffTime = Math.abs(this.dataCheckOut.getTime() - this.dataCheckIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays * this.quarto.getPrecoDiaria();
    }

    public confirmar(): void {
        this.status = StatusReserva.CONFIRMADA;
        this.quarto.marcarComoOcupado();
    }

    public cancelar(): void {
        this.status = StatusReserva.CANCELADA;
        this.quarto.liberar();
    }
    
    public getId(): string {
        return this.id; 
    }
}
