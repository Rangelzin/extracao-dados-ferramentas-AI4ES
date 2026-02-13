# Estratégia de Cobertura de Testes - Sistema de Reserva de Hotel

Este documento detalha a estratégia de garantia de qualidade adotada na **Etapa 4** do projeto.

## 1. Visão Geral

A estratégia de testes foi dividida em dois níveis de teste, visando garantir tanto a corretude das regras de negócio isoladas quanto a integração entre os principais componentes do domínio.

| Nível de Teste | Foco | Ferramenta | Cobertura Atual |
|---|---|---|---|
| **Unitário** | Lógica de negócio isolada (`QuartoService`) | Jest + Mock Repository | Cadastro e Edição (Sucesso/Falha) |
| **Integração** | Fluxo completo (`Hospede` → `Reserva` → `Quarto`) | Jest + Services Reais + Mock Repository | Criação de Reserva e atualização de Status |

---

## 2. Testes Unitários (`QuartoService`)

Os testes unitários focam exclusivamente no comportamento do `QuartoService`, isolando-o de dependências externas através de **Mocks** dos repositórios.

### Cenários Cobertos
1.  **Cadastro de Quarto (`cadastrarQuarto`)**
    *   **Sucesso**: Verifica se o método `save` do repositório é chamado com os dados corretos e se o ID é gerado.
    *   **Falha (Duplicidade)**: Verifica se o sistema impede o cadastro de um quarto com número já existente, lançando a exceção apropriada sem chamar o repositório.

2.  **Edição de Quarto (`editarQuarto`)**
    *   **Sucesso**: Verifica se o método `update` é chamado com os dados atualizados.
    *   **Falha (Não Encontrado)**: Verifica se o sistema rejeita a edição de um ID inexistente.

**Benefício**: Garante que as regras de validação e fluxo de controle dentro do serviço funcionam como esperado, antes de envolver outras partes do sistema.

---

## 3. Testes de Integração (`Fluxo de Reserva`)

Os testes de integração validam a orquestração entre múltiplos serviços e entidades. Diferente dos testes unitários, aqui utilizamos as **implementações reais** dos Services (`HospedeService`, `ReservaService`) interagindo entre si. Apenas a camada de banco de dados (Repositórios) permanece mockada para velocidade e isolamento de infraestrutura.

### Cenário: Fluxo Completo de Reserva
O teste `reserva-flow.test.ts` simula uma jornada completa do usuário:

1.  **Etapa 1: Cadastro de Hóspede**
    *   O `HospedeService` é acionado para criar um novo registro.
    *   *Validação*: Verifica se o hóspede foi persistido corretamente.

2.  **Etapa 2: Validar Disponibilidade**
    *   O sistema verifica se o `Quarto` alvo existe e está com status `LIVRE`.

3.  **Etapa 3: Efetuar Reserva**
    *   O `ReservaService` cria a reserva associando Hóspede e Quarto.
    *   **Regra Crítica**: O status do Quarto deve mudar automaticamente de `LIVRE` para `OCUPADO`.

4.  **Etapa 4: Validação Final**
    *   Verifica se a `Reserva` foi salva com o valor total calculado corretamente.
    *   Verifica se o `Quarto` foi atualizado no repositório com o novo status.

**Benefício**: Garante que os componentes do sistema "conversam" corretamente e que os efeitos colaterais de uma ação (criar reserva) refletem corretamente em outros agregados (ocupar quarto).
