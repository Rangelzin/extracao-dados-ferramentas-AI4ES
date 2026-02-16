# Estratégia de Cobertura de Testes

## Objetivo
Garantir que as principais funcionalidades do sistema sejam validadas por meio de testes automatizados, abrangendo tanto a lógica de negócio isolada (testes unitários) quanto a integração entre módulos (testes de integração).

## Abordagem

### 1. Testes Unitários
- **Foco:** Validar o comportamento de classes e funções de forma isolada, sem dependências externas.
- **Exemplo:**
  - Cadastro de quarto: Verifica se um objeto `Quarto` é criado corretamente com todos os atributos esperados.
  - Edição de quarto: Garante que as propriedades de um quarto podem ser alteradas e persistem corretamente.
- **Benefício:** Rapidez na execução e fácil identificação de falhas pontuais na lógica de negócio.

### 2. Testes de Integração
- **Foco:** Validar o fluxo completo entre diferentes módulos do sistema, simulando operações reais do usuário.
- **Exemplo:**
  - Cadastro de hóspede → Criação de reserva → Atualização de disponibilidade do quarto.
  - Garante que, ao cadastrar um hóspede e criar uma reserva, o estado do quarto é atualizado corretamente para "Ocupado".
- **Benefício:** Confirma que os módulos interagem corretamente e que o sistema funciona de ponta a ponta.

## Estratégia de Cobertura
- **Cobertura mínima:** Todas as regras de negócio críticas e fluxos principais devem ser cobertos por testes automatizados.
- **Cobertura unitária:** Cada classe de domínio (ex: Quarto, Hóspede, Reserva) deve possuir testes para seus métodos principais.
- **Cobertura de integração:** Os principais fluxos de uso do sistema (ex: reserva de quarto) devem ser validados por testes de integração.
- **Evolução contínua:** Novas funcionalidades devem ser acompanhadas de novos testes, mantendo a cobertura sempre atualizada.

## Ferramentas
- **Unitários:** Jest (ou similar)
- **Integração:** Supertest (para simulação de requisições HTTP)

## Observações
- O objetivo não é apenas atingir um percentual de cobertura, mas garantir que os testes validem os comportamentos mais relevantes para o negócio.
- Testes automatizados são parte fundamental da qualidade e facilitam a evolução segura do sistema.