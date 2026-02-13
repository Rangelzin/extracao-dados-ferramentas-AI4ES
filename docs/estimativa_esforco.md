# Estimativa de Esforço - Sistema de Reserva de Hotel

Esta estimativa utiliza Story Points (Sequência de Fibonacci) para complexidade e uma conversão aproximada para horas de desenvolvimento.

**Premissa**: 1 Story Point (SP) ≈ 4-6 horas de trabalho focado.

## Tabela de Estimativas

| Épico / Funcionalidade | Complexidade (SP) | Horas Est. (Méd) | Descrição |
|---|:---:|:---:|---|
| **1. Configuração Inicial** | **3** | **12h** | Setup repo, Docker, CI/CD básico, Estrutura Pastas. |
| **2. Gestão de Quartos** | **8** | **32h** | CRUD Backend, Frontend, Valid., Testes Unitários. |
| *2.1 Backend (Entity, Svc, Repo)* | 3 | 12h | Inclui lógica de geração de camas. |
| *2.2 Frontend (Lista, Form)* | 5 | 20h | Integração API, Estilização Tailwind. |
| **3. Gestão de Hóspedes** | **3** | **12h** | CRUD simples (Backend + Frontend). |
| **4. Gestão de Reservas** | **13** | **52h** | Lógica complexa de datas e disponibilidade. |
| *4.1 Backend (Regras, Svc)* | 8 | 32h | Validação datas, conflitos, transação. |
| *4.2 Frontend (UI Reserva)* | 5 | 20h | Seleção de hóspede, quarto e datas. |
| **5. Infraestrutura & Ops** | **5** | **20h** | Dockerfiles otimizados, Monitoramento, Logs. |
| **6. Refatoração & QA** | **5** | **20h** | Melhorias de código, Testes E2E/Int., Bugs. |

## Resumo Total

| Métrica | Total |
|---|---|
| **Story Points** | **37 SP** |
| **Horas Estimadas** | **~148 horas** |
| **Duração (1 Dev Full)** | **~4 semanas** (considerando 40h/sem eficientes) |

## Classificação de Complexidade (Story Points)
*   **1 SP**: Alteração de texto, config simples.
*   **2 SP**: CRUD simples sem regras.
*   **3 SP**: CRUD com validação ou integração simples.
*   **5 SP**: Lógica de negócio moderada, UI complexa.
*   **8 SP**: Lógica complexa, risco alto, múltiplas integrações.
*   **13 SP**: Arquitetura, refatoração global, incerteza alta.
