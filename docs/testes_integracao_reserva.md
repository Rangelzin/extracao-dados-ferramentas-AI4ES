# Teste de Integração - Fluxo de Reserva

Este documento descreve o teste de integração projetado para validar o fluxo crítico de negócio do sistema de hotel.

## Fluxo Validado
O teste de integração em `./code/backend/hotel-integration.test.ts` valida a seguinte sequência:

1.  **Cadastro de Hóspede**: Verifica se um novo hóspede é criado ou recuperado corretamente pelo CPF.
2.  **Criação de Reserva**: Valida a persistência dos dados da reserva vinculando hóspede e quarto.
3.  **Atualização de Disponibilidade**: Garante que, ao concluir a reserva, o status do quarto é alterado automaticamente para **OCUPADO**.

## Componentes Envolvidos
- **HotelIntegrationService**: Orquestrador do fluxo.
- **GestaoQuartosService**: Responsável pela lógica e estado dos quartos.
- **Repositories**: Abstrações de persistência para Hóspedes, Quartos e Reservas.

## Execução
Para rodar este teste específico:
```bash
npm test hotel-integration.test.ts
```
