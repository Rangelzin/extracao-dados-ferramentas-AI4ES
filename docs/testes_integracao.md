# Testes de Integração – Fluxo Completo

## Objetivo
Garantir que o fluxo principal do sistema funcione corretamente, integrando as operações de cadastro de hóspede, criação de reserva e atualização da disponibilidade do quarto.

## Cenário Testado
1. **Cadastro de Hóspede**
   - Endpoint: `POST /hospedes`
   - Dados enviados: nome, sobrenome, cpf, email
   - Resultado esperado: Hóspede cadastrado com sucesso e retorno do ID

2. **Criação de Reserva**
   - Endpoint: `POST /reservas`
   - Dados enviados: número do quarto, ID do hóspede, data de entrada e saída
   - Resultado esperado: Reserva criada com sucesso e retorno do ID

3. **Atualização de Disponibilidade do Quarto**
   - Endpoint: `GET /quartos/:numero`
   - Resultado esperado: Disponibilidade do quarto alterada para "Ocupado" após a reserva

## Exemplo de Implementação
Arquivo: `tests/integracao-fluxo.test.ts`
- Utiliza o framework `supertest` para simular requisições HTTP.
- O teste cobre o fluxo completo, validando as respostas e o estado do sistema após cada operação.

## Observações
- É necessário garantir que o backend esteja rodando e que os endpoints estejam implementados conforme especificado.
- Recomenda-se isolar o ambiente de testes para evitar impactos em dados reais.

---

Esses testes garantem que as integrações entre os módulos principais do sistema funcionam de ponta a ponta, aumentando a confiabilidade da aplicação.