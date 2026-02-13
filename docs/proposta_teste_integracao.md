# Proposta de Testes de Integração - Fluxo de Reserva

## Cenário: Realização de Reserva Completa

O teste validará a interação entre os agregados **Hóspede**, **Quarto** e **Reserva**.

### Pré-condições
- Um Quarto deve existir e estar com status `LIVRE`.
- Um Hóspede deve estar cadastrado no sistema.

### Fluxo de Teste
1.  **Cadastro de Hóspede**:
    - Invocar `HospedeService.cadastrar(dto)`.
    - Verificar persistência.
2.  **Criação de Reserva**:
    - Invocar `ReservaService.criar(dto)`.
        - `dto` contém `hospedeId`, `quartoId`, datas (`checkin`, `checkout`).
    - **Validações do Service**:
        - Deve verificar se o Hóspede existe.
        - Deve verificar se o Quarto existe e está `LIVRE`.
        - Deve criar a entidade `Reserva` com status `CONFIRMADA`.
        - Deve atualizar o status do Quarto para `OCUPADO` (ou manter `LIVRE` até o check-in, dependendo da regra, mas para simplificação assumiremos reserva imediata ou bloqueio).
3.  **Verificação de Estado Final**:
    - A Reserva deve estar persistida.
    - O Quarto deve estar com status alterado (ex: `OCUPADO` ou `RESERVADO`).

## Componentes Necessários (Ainda não implementados)
- `HospedeService` e `IHospedeRepository`
- `ReservaService` e `IReservaRepository`
- Método `reservar()` ou `atualizarStatus()` explícito no `QuartoService`.

## Estrutura do Teste
Arquivo: `tests/integration/reserva-flow.test.ts`
