import Quarto from './Quarto';
import Hospede from './Hospede';

type Disponibilidade = 'Ocupado' | 'Livre' | 'Manutenção' | 'Limpeza';

class Reserva {
  quarto: Quarto;
  hospede: Hospede;
  disponibilidade: Disponibilidade;
  dataCheckIn: Date;
  dataCheckOut: Date;

  constructor(
    quarto: Quarto,
    hospede: Hospede,
    disponibilidade: Disponibilidade,
    dataCheckIn: Date,
    dataCheckOut: Date
  ) {
    this.quarto = quarto;
    this.hospede = hospede;
    this.disponibilidade = disponibilidade;
    this.dataCheckIn = dataCheckIn;
    this.dataCheckOut = dataCheckOut;
  }
}

export default Reserva;