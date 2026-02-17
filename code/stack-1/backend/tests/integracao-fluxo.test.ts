// Teste de integração: Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade do quarto
import request from 'supertest';
import app from '../app'; // Supondo que o app Express está exportado aqui

describe('Fluxo de integração: Hóspede, Reserva e Quarto', () => {
  let idHospede: string;
  let idReserva: string;
  let numeroQuarto = 201;

  it('deve cadastrar um hóspede', async () => {
    const response = await request(app)
      .post('/hospedes')
      .send({
        nome: 'Maria',
        sobrenome: 'Silva',
        cpf: '12345678900',
        email: 'maria@teste.com'
      });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    idHospede = response.body.id;
  });

  it('deve criar uma reserva para o hóspede', async () => {
    const response = await request(app)
      .post('/reservas')
      .send({
        numeroQuarto,
        idHospede,
        dataEntrada: '2026-02-20',
        dataSaida: '2026-02-22'
      });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    idReserva = response.body.id;
  });

  it('deve atualizar a disponibilidade do quarto para Ocupado', async () => {
    const response = await request(app)
      .get(`/quartos/${numeroQuarto}`);
    expect(response.status).toBe(200);
    expect(response.body.disponibilidade).toBe('Ocupado');
  });
});
